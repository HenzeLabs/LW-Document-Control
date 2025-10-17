
import React from 'react';
import { WorkflowStatus } from '../types';

interface StatusBadgeProps {
    status: WorkflowStatus;
    large?: boolean;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, large = false }) => {
    const statusStyles: { [key in WorkflowStatus]: string } = {
        [WorkflowStatus.DRAFT]: 'bg-gray-100 text-gray-800',
        [WorkflowStatus.DEPT_REVIEW]: 'bg-blue-100 text-status-blue',
        [WorkflowStatus.REVIEWER_APPROVAL]: 'bg-cyan-100 text-cyan-800',
        [WorkflowStatus.DOC_CONTROL_REVIEW]: 'bg-purple-100 text-purple-800',
        [WorkflowStatus.FINAL_MGMT_APPROVAL]: 'bg-blue-100 text-status-blue',
        [WorkflowStatus.DOCUMENTATION_UPDATES]: 'bg-indigo-100 text-indigo-800',
        [WorkflowStatus.PENDING_PLATFORM_ACK]: 'bg-orange-100 text-orange-800',
        [WorkflowStatus.PENDING_TRAINING_ACK]: 'bg-yellow-100 text-status-yellow',
        [WorkflowStatus.REJECTED_BY_DEPT_HEAD]: 'bg-red-100 text-status-red',
        [WorkflowStatus.REJECTED_BY_REVIEWER]: 'bg-red-100 text-status-red',
        [WorkflowStatus.COMPLETE]: 'bg-green-100 text-status-green',
    };

    const sizeClasses = large ? 'px-3 py-1 text-sm' : 'px-2 py-0.5 text-xs';

    return (
        <span
            className={`inline-flex items-center font-medium rounded-full ${sizeClasses} ${statusStyles[status]}`}
        >
            {status}
        </span>
    );
};

export default StatusBadge;
