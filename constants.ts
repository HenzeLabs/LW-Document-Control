import { User, DocumentChangeRequest, WorkflowStatus } from './types';

export const MOCK_USERS: User[] = [
    { id: 'user-1', name: 'Taylor Gottselig', role: 'Requestor', department: 'Sales' },
    { id: 'user-2', name: 'Mike Thomas', role: 'Department Head', department: 'Sales' },
    { id: 'user-3', name: 'Lauren', role: 'Reviewer', department: 'Marketing' },
    { id: 'user-4', name: 'Wendy Molero', role: 'Document Control', department: 'Admin' },
    { id: 'user-5', name: 'Alice', role: 'Requestor', department: 'R&D' },
    { id: 'user-6', name: 'Sharon Chen', role: 'Requestor', department: 'Finance' },
];

export const MOCK_REQUESTS: DocumentChangeRequest[] = [
    {
        id: 'DCR-2025-001',
        status: WorkflowStatus.DEPT_REVIEW,
        requestorId: 'user-1',
        requestorName: 'Taylor Gottselig',
        requestDate: '2025-10-15',
        step1: {
            changeType: 'New Document',
            documentTitle: 'CME i4 Spec Sheet',
            documentNumber: 'SLS-7.5.3-L-097.004',
            documentRevision: '0',
            subDocumentInfo: 'N/A',
            departmentAffected: 'Sales',
            changeReason: 'New spec sheet for CME i4 microscope.',
            requestorInitials: 'T.G.',
            attachments: [],
        },
        emailLog: [
            { timestamp: '2025-10-15 11:00 AM', event: 'Submitted for Department Review', recipient: 'miket@lwscientific.com' }
        ]
    },
    {
        id: 'DCR-2025-002',
        status: WorkflowStatus.DOC_CONTROL_REVIEW,
        requestorId: 'user-2',
        requestorName: 'Mike Thomas',
        requestDate: '2025-08-18',
        step1: {
            changeType: 'Revision',
            documentTitle: 'MegaVID Bracket Installation Instructions',
            documentNumber: 'MKT-7.5.3-L-359',
            documentRevision: '0',
            subDocumentInfo: 'N/A',
            departmentAffected: 'Marketing',
            changeReason: 'Add Attaching the Bracket: Snap the bracket onto each side of the MegaVID camera, ensuring that the edges of the bracket fit snugly into the grooves on the camera.',
            requestorInitials: 'MT',
            attachments: [],
        },
        emailLog: [
            { timestamp: '2025-08-18 09:00 AM', event: 'Submitted for Department Review', recipient: 'laurenh@lwscientific.com' },
            { timestamp: '2025-08-19 10:30 AM', event: 'Approved by Dept. Head, sent for Reviewer Approval', recipient: 'laurenh@lwscientific.com' },
            { timestamp: '2025-08-20 02:15 PM', event: 'Approved by Reviewer, sent for Document Control Review', recipient: 'wendym@lwscientific.com' }
        ]
    },
    {
        id: 'DCR-2025-003',
        status: WorkflowStatus.REVIEWER_APPROVAL,
        requestorId: 'user-6',
        requestorName: 'Sharon Chen',
        requestDate: '2025-09-12',
        step1: {
            changeType: 'Revision',
            documentTitle: 'Requisition Form',
            documentNumber: 'PUR-7.4.2-F-001',
            documentRevision: '7',
            subDocumentInfo: 'Section 2',
            departmentAffected: 'Purchasing',
            changeReason: 'Add new approval field.',
            requestorInitials: 'S.C.',
            attachments: [],
        },
        emailLog: [
            { timestamp: '2025-09-12 03:00 PM', event: 'Submitted for Department Review', recipient: 'draganam@lwscientific.com' },
            { timestamp: '2025-09-13 10:00 AM', event: 'Approved by Dept. Head, sent for Reviewer Approval', recipient: 'laurat@lwscientific.com' }
        ]
    },
     {
        id: 'DCR-2025-004',
        status: WorkflowStatus.COMPLETE,
        requestorId: 'user-2',
        requestorName: 'Mike Thomas',
        requestDate: '2025-06-20',
        step1: {
            changeType: 'Revision',
            documentTitle: 'MXU Spec Sheet',
            documentNumber: 'SLS-7.5.3-L-125',
            documentRevision: '1',
            subDocumentInfo: 'N/A',
            departmentAffected: 'Sales',
            changeReason: 'Update MUC-06SD-15T3 part number.',
            requestorInitials: 'M.T.',
            attachments: [],
        },
    },
];