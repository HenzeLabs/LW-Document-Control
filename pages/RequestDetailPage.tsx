import React, { useContext } from 'react';
import { DocumentChangeRequest, WorkflowStatus, User } from '../types';
import { AuthContext } from '../contexts/AuthContext';
import WorkflowStepper from '../components/workflow/WorkflowStepper';
import Step1_RequestSubmission from '../components/workflow/Step1_RequestSubmission';
import Step2_DepartmentReview from '../components/workflow/Step2_DepartmentReview';
import Step3_ReviewerApproval from '../components/workflow/Step3_ReviewerApproval';
import InitialRequestInfo from '../components/workflow/InitialRequestInfo';
import EmailLog from '../components/workflow/EmailLog';
import { BackIcon } from '../components/Icons';
import StatusBadge from '../components/StatusBadge';

interface RequestDetailPageProps {
    request: DocumentChangeRequest;
    onBack: () => void;
    onUpdateRequest: (updatedRequest: DocumentChangeRequest) => void;
}

const RequestDetailPage: React.FC<RequestDetailPageProps> = ({ request, onBack, onUpdateRequest }) => {
    const { user } = useContext(AuthContext);

    const renderCurrentStepComponent = () => {
        // Only allow editing for DRAFT status by the requestor
        if (request.status === WorkflowStatus.DRAFT && request.requestorId === user.id) {
            return <Step1_RequestSubmission request={request} onUpdateRequest={onUpdateRequest} />;
        }
        
        // Show review component for Department Head
        if (request.status === WorkflowStatus.DEPT_REVIEW) {
            return <Step2_DepartmentReview request={request} onUpdateRequest={onUpdateRequest} currentUser={user} />;
        }

        // Show review component for Reviewer
        if (request.status === WorkflowStatus.REVIEWER_APPROVAL) {
            return <Step3_ReviewerApproval request={request} onUpdateRequest={onUpdateRequest} currentUser={user} />;
        }

        // For other statuses, we can show other components or just the info
        return null;
    };

    return (
        <div>
            <button onClick={onBack} className="inline-flex items-center mb-6 text-sm font-medium text-gray-600 hover:text-gray-900">
                <BackIcon className="w-5 h-5 mr-2" />
                Back to List
            </button>

            <div className="lg:grid lg:grid-cols-4 lg:gap-8">
                {/* Main Content */}
                <div className="lg:col-span-3 space-y-8">
                    <div className="bg-white p-6 rounded-lg shadow">
                        <div className="flex items-start justify-between">
                            <div>
                                <h1 className="text-2xl font-bold text-gray-800">{request.step1.documentTitle || 'New Document Request'}</h1>
                                <p className="text-sm text-gray-500 mt-1">Request ID: {request.id}</p>
                            </div>
                            <StatusBadge status={request.status} large />
                        </div>
                    </div>

                    {renderCurrentStepComponent()}
                    
                    <InitialRequestInfo step1Data={request.step1} />
                    
                    {request.emailLog && <EmailLog log={request.emailLog} />}
                </div>

                {/* Sidebar */}
                <aside className="hidden lg:block lg:col-span-1">
                    <div className="sticky top-8 space-y-6">
                         <div className="bg-white p-6 rounded-lg shadow">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-lg font-semibold text-gray-800">Workflow Status</h2>
                            </div>
                            <WorkflowStepper currentStatus={request.status} />
                        </div>
                    </div>
                </aside>
            </div>
            
        </div>
    );
};

export default RequestDetailPage;