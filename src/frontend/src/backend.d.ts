import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface FamilyMember {
    name: string;
    role: string;
    share: bigint;
    amount: bigint;
}
export interface Payout {
    status: string;
    date: string;
    investorShare: bigint;
    grossRevenue: bigint;
    bikeId: string;
}
export interface InvestorProfile {
    city: string;
    familyMembers: Array<FamilyMember>;
    portfolioValue: bigint;
    bikes: Array<Bike>;
    totalPayout: bigint;
    totalBikes: bigint;
    payouts: Array<Payout>;
    investorName: string;
}
export interface UserProfile {
    name: string;
}
export interface Bike {
    id: string;
    status: string;
    todayEarnings: bigint;
    legalNo: string;
    monthEarnings: bigint;
    investedAmount: bigint;
    ownershipPercentage: bigint;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getDemoInvestors(): Promise<Array<string>>;
    getMyProfile(): Promise<InvestorProfile | null>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    loginAsDemo(name: string): Promise<void>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    seedDemoData(): Promise<void>;
    upsertMyProfile(profile: InvestorProfile): Promise<void>;
}
