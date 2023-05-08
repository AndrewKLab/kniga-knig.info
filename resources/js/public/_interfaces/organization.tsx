export interface Organization {
    kk_organization_id: number;
    kk_organization_parrent_id: number;
    kk_organization_type_id: number;
    kk_organization_name: string | null;
    kk_organization_created_at: string | null;
    kk_organization_updated_at: string | null;
    type: object;
    parrent: object;
}