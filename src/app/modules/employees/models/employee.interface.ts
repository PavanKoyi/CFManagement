interface MedicalPlan {
    planType: string;
    coverageType: string;
    startDate: Date;
}

interface Retirement401k {
    contributionPercentage: number;
    companyMatch: number;
}

export interface BaseEmployee {
    id?: number;
    name: string;
    email: string;
    phone: string;
    address: string;
    role: string;
    joinDate: Date;
    employmentType: 'FULL_TIME' | 'CONTRACTOR';
}

export interface FullTimeEmployee extends BaseEmployee {
    employmentType: 'FULL_TIME';
    annualSalary: number;
    medical: MedicalPlan;
    retirement401k: Retirement401k;
}

export interface ContractorEmployee extends BaseEmployee {
    employmentType: 'CONTRACTOR';
    hourlyRate: number;
    expectedHoursPerWeek: number;
    contractDuration: number;
}

export type Employee = FullTimeEmployee | ContractorEmployee;
