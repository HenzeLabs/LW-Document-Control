import React, { useState } from 'react';
import { DocumentChangeRequest, Step1Data, WorkflowStatus } from '../../types';

interface Step1Props {
    request: DocumentChangeRequest;
    onUpdateRequest: (updatedRequest: DocumentChangeRequest) => void;
}

const FormField: React.FC<{label: string, children: React.ReactNode}> = ({label, children}) => (
    <div>
        <label className="block text-sm font-medium text-gray-700">{label}</label>
        <div className="mt-1">{children}</div>
    </div>
);

const Step1_RequestSubmission: React.FC<Step1Props> = ({ request, onUpdateRequest }) => {
    const [formData, setFormData] = useState<Step1Data>(request.step1);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSaveDraft = () => {
        onUpdateRequest({ ...request, step1: formData });
        alert('Draft saved!');
    };
    
    const handleSubmitForReview = () => {
         onUpdateRequest({ 
            ...request, 
            step1: formData, 
            status: WorkflowStatus.DEPT_REVIEW,
        });
        alert('Submitted for review!');
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-6 text-gray-800">Request Submission (Draft)</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField label="Document Title">
                    <input type="text" name="documentTitle" value={formData.documentTitle} onChange={handleChange} className="block w-full border-gray-300 rounded-md shadow-sm sm:text-sm" />
                </FormField>
                <FormField label="Document Number">
                    <input type="text" name="documentNumber" value={formData.documentNumber} onChange={handleChange} className="block w-full border-gray-300 rounded-md shadow-sm sm:text-sm" />
                </FormField>
                 <FormField label="Change Type">
                     <select name="changeType" value={formData.changeType || ''} onChange={handleChange} className="block w-full border-gray-300 rounded-md shadow-sm sm:text-sm">
                        <option value="" disabled>Select a type</option>
                        <option value="New Document">New Document</option>
                        <option value="Revision">Revision</option>
                        <option value="Obsoletion">Obsoletion</option>
                    </select>
                </FormField>
                <FormField label="Department Affected">
                    <input type="text" name="departmentAffected" value={formData.departmentAffected} onChange={handleChange} className="block w-full border-gray-300 rounded-md shadow-sm sm:text-sm" />
                </FormField>
                <div className="md:col-span-2">
                    <FormField label="Indicate Change & Reason for Change">
                        <textarea name="changeReason" rows={4} value={formData.changeReason} onChange={handleChange} className="block w-full border-gray-300 rounded-md shadow-sm sm:text-sm" />
                    </FormField>
                </div>
            </div>
            <div className="mt-8 pt-6 border-t border-gray-200 flex justify-end space-x-3">
                 <button onClick={handleSaveDraft} className="bg-white text-gray-700 px-4 py-2 rounded-md border border-gray-300 shadow-sm hover:bg-gray-50">
                    Save Draft
                </button>
                 <button onClick={handleSubmitForReview} className="bg-brand-blue text-white px-4 py-2 rounded-md shadow-sm hover:bg-brand-blue-light">
                    Submit for Review
                </button>
            </div>
        </div>
    );
};

export default Step1_RequestSubmission;
