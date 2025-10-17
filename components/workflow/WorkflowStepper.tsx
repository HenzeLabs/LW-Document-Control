
import React from 'react';
import { WorkflowStatus } from '../../types';
import { CheckCircleIcon, ClockIcon, UserCircleIcon, XCircleIcon } from '../Icons';

interface WorkflowStepperProps {
    currentStatus: WorkflowStatus;
}

const STEPS = [
    { name: 'Request Submission', statuses: [WorkflowStatus.DRAFT, WorkflowStatus.REJECTED_BY_DEPT_HEAD, WorkflowStatus.REJECTED_BY_REVIEWER] },
    { name: 'Department Review', statuses: [WorkflowStatus.DEPT_REVIEW] },
    { name: 'Reviewer Approval', statuses: [WorkflowStatus.REVIEWER_APPROVAL] },
    { name: 'Document Control', statuses: [WorkflowStatus.DOC_CONTROL_REVIEW] },
    { name: 'Final Approval', statuses: [WorkflowStatus.FINAL_MGMT_APPROVAL] },
    { name: 'Documentation', statuses: [WorkflowStatus.DOCUMENTATION_UPDATES, WorkflowStatus.PENDING_PLATFORM_ACK, WorkflowStatus.PENDING_TRAINING_ACK] },
];

const getStepState = (stepIndex: number, currentStatus: WorkflowStatus): 'completed' | 'current' | 'upcoming' | 'rejected' => {
    const statusOrder = Object.values(WorkflowStatus);
    const currentStatusIndex = statusOrder.indexOf(currentStatus);
    
    if (currentStatus === WorkflowStatus.REJECTED_BY_DEPT_HEAD || currentStatus === WorkflowStatus.REJECTED_BY_REVIEWER) {
        if (STEPS[stepIndex].statuses.includes(currentStatus)) return 'rejected';
    }
    
    const firstStatusInCurrentStep = statusOrder.indexOf(STEPS[stepIndex].statuses[0]);
    if (currentStatus === WorkflowStatus.COMPLETE) return 'completed';
    
    // Find which step the current status belongs to
    let currentStepIndex = -1;
    for (let i = 0; i < STEPS.length; i++) {
        if (STEPS[i].statuses.includes(currentStatus)) {
            currentStepIndex = i;
            break;
        }
    }

    if (stepIndex < currentStepIndex) return 'completed';
    if (stepIndex === currentStepIndex) return 'current';
    return 'upcoming';
};


const WorkflowStepper: React.FC<WorkflowStepperProps> = ({ currentStatus }) => {
    return (
        <nav aria-label="Progress">
            <ol role="list" className="space-y-4">
                {STEPS.map((step, stepIdx) => {
                    const state = getStepState(stepIdx, currentStatus);
                    let icon, textColor, statusText;

                    switch (state) {
                        case 'completed':
                            icon = <CheckCircleIcon className="w-6 h-6 text-status-green" />;
                            textColor = 'text-gray-900';
                            statusText = 'Completed';
                            break;
                        case 'current':
                            icon = <ClockIcon className="w-6 h-6 text-status-blue" />;
                            textColor = 'text-brand-blue font-semibold';
                            statusText = 'In Progress';
                            break;
                        case 'rejected':
                             icon = <XCircleIcon className="w-6 h-6 text-status-red" />;
                             textColor = 'text-status-red font-semibold';
                             statusText = 'Revision Required';
                            break;
                        default: // upcoming
                            icon = <UserCircleIcon className="w-6 h-6 text-gray-300" />;
                            textColor = 'text-gray-500';
                            statusText = 'Pending';
                            break;
                    }

                    return (
                        <li key={step.name} className="flex items-start">
                            <div className="flex-shrink-0 mr-4 mt-1">{icon}</div>
                            <div>
                                <p className={`text-sm font-medium ${textColor}`}>{step.name}</p>
                                <p className="text-xs text-gray-500">{statusText}</p>
                            </div>
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
};

export default WorkflowStepper;
