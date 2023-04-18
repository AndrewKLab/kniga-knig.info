import { History, Transition, Action } from 'history';
import { useContext, useEffect, useState } from 'react';
import {
  UNSAFE_NavigationContext,
  useNavigate,
} from 'react-router-dom';

type BlockerState = 'DISABLED' | 'PENDING' | 'ACTIVE';

export const useNavBlocker = (enabled = true) => {
  const navigate = useNavigate();
  // This is the only way to use blocker right now
  const navigator = useContext(UNSAFE_NavigationContext)
    .navigator as History;
  // Save the location user was navigating to
  const [nextLocation, setNextLocation] =
    useState<Transition | null>(null);
  // Blocking user in a page is not a nice thing to do
  // Allow users to leave page with multiple POP actions
  // 'PENDING' state is needed for the desired behavior
  const [blocker, setBlocker] =
    useState<BlockerState>('ACTIVE');

  // Actions to control blocker from outside
  const navigation = {
    confirm: () => setBlocker('DISABLED'),
    cancel: () => setBlocker('ACTIVE'),
  };

  useEffect(() => {
    // Functionality to turn blocker on/off
    if (!enabled) {
      return;
    }

    // User confirms navigation ->
    // navigate user to the location he was trying to go
    if (blocker === 'DISABLED' && nextLocation?.action) {
      if (nextLocation.action === Action.Push) {
        navigate(nextLocation.location.pathname);
      }

      if (nextLocation.action === Action.Pop) {
        navigate(-1);
      }
    }

    // Blocker is in 'ACTIVE' state by default ->
    // active blocker -> stop any navigation
    if (blocker === 'ACTIVE') {
      const unblock = navigator.block(
        (transition: Transition) => {
          // User is still deciding - warning is open
          setBlocker('PENDING');
          // Save location user was trying to access
          setNextLocation(transition);
        },
      );

      // Active blocker is cleaned up before each render
      return unblock;
    }
  }, [
    nextLocation?.action,
    nextLocation?.location.pathname,
    navigate,
    blocker,
    navigator,
    enabled,
  ]);

  // Expose a flag and control for the outside component
  return { showPrompt: blocker === 'PENDING', navigation };
};
