export enum WorkflowStatus {
    DRAFT = 'Draft',
    DEPT_REVIEW = 'Department Review',
    REVIEWER_APPROVAL = 'Reviewer Approval',
    DOC_CONTROL_REVIEW = 'Doc Control Review',
    FINAL_MGMT_APPROVAL = 'Final Mgmt Approval',
    DOCUMENTATION_UPDATES = 'Documentation Updates',
    PENDING_PLATFORM_ACK = 'Pending Platform Ack',
    PENDING_TRAINING_ACK = 'Pending Training Ack',
    REJECTED_BY_DEPT_HEAD = 'Rejected by Dept Head',
    REJECTED_BY_REVIEWER = 'Rejected by Reviewer',
    COMPLETE = 'Complete',
}

export interface User {
    id: string;
    name: string;
    role: 'Requestor' | 'Department Head' | 'Reviewer' | 'Document Control' | 'Final Approver';
    department: string;
}

export interface Attachment {
    name: string;
    size: number;
    type: string;
    url: string; // or content as base64
}

export interface Step1Data {
    changeType: 'New Document' | 'Revision' | 'Obsoletion' | null;
    documentTitle: string;
    documentNumber: string;
    documentRevision: string;
    subDocumentInfo: string;
    departmentAffected: string;
    changeReason: string;
    requestorInitials: string;
    attachments: Attachment[];
}

export interface Review {
    reviewerId: string;
    reviewerName: string;
    decision: 'Approved' | 'Rejected';
    comments: string;
    signature: string; // data URL of signature image
    date: string;
}

export interface Step2Data {
    review?: Review;
}

export interface Step3Data {
    review?: Review;
}

export interface EmailLogEntry {
    timestamp: string;
    event: string;
    recipient: string;
}

export interface DocumentChangeRequest {
    id: string;
    status: WorkflowStatus;
    requestorId: string;
    requestorName: string;
    requestDate: string;
    step1: Step1Data;
    step2?: Step2Data;
    step3?: Step3Data;
    emailLog?: EmailLogEntry[];
}
