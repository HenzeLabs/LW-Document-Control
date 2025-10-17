import React from 'react';
import type { Step1Data } from '../../types';

interface InitialRequestInfoProps {
    step1Data: Step1Data;
}

const InfoField: React.FC<{ label: string; value?: string | null }> = ({ label, value }) => (
    <div>
        <dt className="text-sm font-medium text-gray-500">{label}</dt>
        <dd className="mt-1 text-sm text-gray-900">{value || <span className="text-gray-400">N/A</span>}</dd>
    </div>
);

const InitialRequestInfo: React.FC<InitialRequestInfoProps> = ({ step1Data }) => {
    return (
        <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Initial Request Information</h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">This is the original information submitted by the requestor.</p>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                <dl className="sm:divide-y sm:divide-gray-200">
                    <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <InfoField label="Document Status" value={step1Data.changeType} />
                        <InfoField label="Department Affected" value={step1Data.departmentAffected} />
                        <InfoField label="Requestor Initials" value={step1Data.requestorInitials} />
                    </div>
                     <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <InfoField label="Document Title" value={step1Data.documentTitle} />
                        <InfoField label="Document Number" value={step1Data.documentNumber} />
                        <InfoField label="Document Revision" value={step1Data.documentRevision} />
                    </div>
                     <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <InfoField label="Sub Document Info" value={step1Data.subDocumentInfo} />
                    </div>
                    <div className="py-4 sm:py-5 sm:grid sm:grid-cols-1 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Indicate Change & Reason for Change</dt>
                        <dd className="mt-1 text-sm text-gray-900 whitespace-pre-wrap">{step1Data.changeReason || <span className="text-gray-400">N/A</span>}</dd>
                    </div>
                     <div className="py-4 sm:py-5 sm:grid sm:grid-cols-1 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Attachments</dt>
                        <dd className="mt-1 text-sm text-gray-900">
                            {step1Data.attachments && step1Data.attachments.length > 0 ? (
                                <ul role="list" className="border border-gray-200 rounded-md divide-y divide-gray-200">
                                    {step1Data.attachments.map((file, index) => (
                                         <li key={index} className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                                            <div className="w-0 flex-1 flex items-center">
                                                <svg className="flex-shrink-0 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fillRule="evenodd" d="M8 4a3 3 0 00-3 3v4a3 3 0 006 0V7a1 1 0 112 0v4a5 5 0 01-10 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z" clipRule="evenodd"></path></svg>
                                                <span className="ml-2 flex-1 w-0 truncate">{file.name}</span>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <span className="text-gray-400">No attachments provided.</span>
                            )}
                        </dd>
                    </div>
                </dl>
            </div>
        </div>
    );
};

export default InitialRequestInfo;
