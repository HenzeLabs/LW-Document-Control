import React, { useState } from 'react';
import { DocumentChangeRequest, WorkflowStatus, User, Review } from '../../types';
import SignaturePad from '../SignaturePad';

interface Step2Props {
    request: DocumentChangeRequest;
    onUpdateRequest: (updatedRequest: DocumentChangeRequest) => void;
    currentUser: User;
}

const Step2_DepartmentReview: React.FC<Step2Props> = ({ request, onUpdateRequest, currentUser }) => {
    const [comments, setComments] = useState('');
    const [signature, setSignature] = useState<string | null>(null);
    
    // In a real app, this would be determined by user role and department
    const canReview = currentUser.role === 'Department Head';

    if (!canReview) {
        return (
            <div className="bg-white p-6 rounded-lg shadow">
                 <h2 className="text-xl font-bold mb-4">Department Review</h2>
                 <p className="text-gray-600">Awaiting review from the Department Head.</p>
            </div>
        );
    }
    
    const handleDecision = (decision: 'Approved' | 'Rejected') => {
        if (!signature) {
            alert('Please provide a signature.');
            return;
        }
        if (decision === 'Rejected' && !comments) {
            alert('Please provide comments for rejection.');
            return;
        }

        const review: Review = {
            reviewerId: currentUser.id,
            reviewerName: currentUser.name,
            decision,
            comments,
            signature,
            date: new Date().toISOString().split('T')[0],
        };
        
        const nextStatus = decision === 'Approved' ? WorkflowStatus.REVIEWER_APPROVAL : WorkflowStatus.REJECTED_BY_DEPT_HEAD;

        onUpdateRequest({
            ...request,
            status: nextStatus,
            step2: { review },
        });
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Action: Department Review</h2>
            <div className="space-y-6">
                 <div>
                    <label htmlFor="comments-dept" className="block text-sm font-medium text-gray-700">Comments (required for rejection)</label>
                    <textarea 
                        id="comments-dept"
                        rows={4}
                        value={comments}
                        onChange={(e) => setComments(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-brand-blue-light focus:border-brand-blue-light sm:text-sm"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">E-Signature</label>
                    <div className="mt-1 p-4 border rounded-md">
                        <SignaturePad onSave={(sig) => setSignature(sig)} />
                    </div>
                </div>
            </div>
            <div className="mt-8 pt-6 border-t flex justify-end space-x-3">
                 <button onClick={() => handleDecision('Rejected')} className="bg-white text-status-red px-4 py-2 rounded-md border border-status-red shadow-sm hover:bg-red-50">
                    Reject & Send for Revision
                </button>
                 <button onClick={() => handleDecision('Approved')} className="bg-status-green text-white px-4 py-2 rounded-md shadow-sm hover:bg-green-700">
                    Approve & Forward
                </button>
            </div>
        </div>
    );
};

export default Step2_DepartmentReview;
