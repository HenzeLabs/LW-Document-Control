import React from 'react';
import { XIcon } from '../Icons';

interface WorkflowHelpModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const WorkflowHelpModal: React.FC<WorkflowHelpModalProps> = ({ isOpen, onClose }) => {
    if (!isOpen) {
        return null;
    }

    const Step: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
        <div>
            <h4 className="text-md font-semibold text-gray-800 mb-1">{title}</h4>
            <p className="text-sm text-gray-600">{children}</p>
        </div>
    );

    return (
        <div 
            className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center"
            onClick={onClose}
            aria-modal="true"
            role="dialog"
        >
            <div 
                className="relative mx-auto p-8 border w-full max-w-2xl shadow-lg rounded-md bg-white"
                onClick={e => e.stopPropagation()} // Prevent click from closing modal
            >
                <div className="flex items-start justify-between">
                    <div>
                        <h3 className="text-2xl font-bold text-gray-900">Workflow Documentation</h3>
                        <p className="text-sm text-gray-500 mt-1">A guide to the document change control process.</p>
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <XIcon className="w-6 h-6" />
                    </button>
                </div>

                <div className="mt-6 space-y-5">
                    <Step title="1. Request Submission">
                        The requestor fills out the initial form with all required details about the document change and submits it for review. The request is in a "Draft" state until submitted.
                    </Step>
                    <Step title="2. Department Review">
                        The head of the affected department reviews the request to assess its impact and validity. They can either approve it and forward it, or reject it and send it back to the requestor for revision.
                    </Step>
                    <Step title="3. Reviewer Approval">
                        One or more assigned reviewers check the request for accuracy, completeness, and potential conflicts. If any reviewer rejects it, it returns to the requestor. All must approve to proceed.
                    </Step>
                    <Step title="4. Document Control Review">
                        The Document Control team reviews the request to ensure it complies with all procedural and formatting standards. They are responsible for assigning the final approvers based on the document's tier.
                    </Step>
                    <Step title="5. Final Management Approval">
                        The manager(s) assigned by Document Control give the final sign-off on the change. This is the last approval step before implementation.
                    </Step>
                    <Step title="6. Documentation & Updates">
                        Document Control executes the final steps: updating the official document revision, updating external systems (like ERP or websites if required), and coordinating with HR for any necessary training.
                    </Step>
                </div>

                <div className="mt-8 text-right">
                    <button 
                        onClick={onClose} 
                        className="px-4 py-2 bg-brand-blue text-white text-base font-medium rounded-md shadow-sm hover:bg-brand-blue-light focus:outline-none focus:ring-2 focus:ring-brand-blue"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default WorkflowHelpModal;
