import React, { useState } from 'react';
import type { DocumentChangeRequest } from '../types';
import { WorkflowStatus } from '../types';
import StatusBadge from './StatusBadge';
import { DownloadIcon, ChevronDownIcon } from './Icons';

// TypeScript declaration for the jsPDF library loaded from CDN
declare const jspdf: { jsPDF: new (options?: any) => any };

interface RequestListProps {
    requests: DocumentChangeRequest[];
    onSelectRequest: (request: DocumentChangeRequest) => void;
}

const RequestTable: React.FC<{
    requests: DocumentChangeRequest[];
    onSelectRequest: (request: DocumentChangeRequest) => void;
    onDownloadPdf: (request: DocumentChangeRequest) => void;
    showDownloadAction?: boolean; // Prop to control visibility of the download action
}> = ({ requests, onSelectRequest, onDownloadPdf, showDownloadAction = false }) => (
    <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
                <tr>
                    <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Request ID</th>
                    <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Document Title</th>
                    <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Requestor</th>
                    <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Status</th>
                    <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Date</th>
                    {showDownloadAction && <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-right text-gray-500 uppercase">Actions</th>}
                </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
                {requests.map((request) => (
                    <tr key={request.id} className="hover:bg-gray-50">
                        <td onClick={() => onSelectRequest(request)} className="px-6 py-4 text-sm font-medium text-brand-blue whitespace-nowrap cursor-pointer">{request.id}</td>
                        <td onClick={() => onSelectRequest(request)} className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap cursor-pointer">{request.step1.documentTitle}</td>
                        <td onClick={() => onSelectRequest(request)} className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap cursor-pointer">{request.requestorName}</td>
                        <td onClick={() => onSelectRequest(request)} className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap cursor-pointer"><StatusBadge status={request.status} /></td>
                        <td onClick={() => onSelectRequest(request)} className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap cursor-pointer">{request.requestDate}</td>
                        {showDownloadAction && (
                            <td className="px-6 py-4 text-sm text-right whitespace-nowrap">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onDownloadPdf(request);
                                    }}
                                    className="text-gray-400 hover:text-brand-blue"
                                    title="Download PDF Summary"
                                >
                                    <DownloadIcon className="w-5 h-5" />
                                </button>
                            </td>
                        )}
                    </tr>
                ))}
                 {requests.length === 0 && (
                    <tr>
                        <td colSpan={showDownloadAction ? 6 : 5} className="px-6 py-4 text-sm text-center text-gray-500">No requests found.</td>
                    </tr>
                )}
            </tbody>
        </table>
    </div>
);


const RequestList: React.FC<RequestListProps> = ({ requests, onSelectRequest }) => {
    const [filter, setFilter] = useState('');
    const [statusFilter, setStatusFilter] = useState<WorkflowStatus | 'All'>('All');
    const [completedVisible, setCompletedVisible] = useState(false);

    const handleGeneratePdf = (request: DocumentChangeRequest) => {
        const { jsPDF } = jspdf;
        const doc = new jsPDF({ orientation: 'p', unit: 'mm', format: 'a4' });
        
        let cursorY = 20;
        const leftMargin = 15;
        const rightMargin = 195;
        const lineSpacing = 7;
        const sectionSpacing = 12;

        const addText = (text: string | null | undefined, x: number, y: number, options: any = {}) => {
            if (!text) return;
            const splitText = doc.splitTextToSize(text, rightMargin - leftMargin - (x > leftMargin ? x - leftMargin : 0));
            doc.text(splitText, x, y, options);
            cursorY += (splitText.length - 1) * (lineSpacing * 0.7);
        }

        const addSection = (title: string, data: { [key: string]: string | null | undefined }) => {
            if (cursorY > 260) doc.addPage();
            doc.setFontSize(14);
            doc.setFont(undefined, 'bold');
            addText(title, leftMargin, cursorY);
            cursorY += lineSpacing;
            doc.setDrawColor(200);
            doc.line(leftMargin, cursorY, rightMargin, cursorY);
            cursorY += lineSpacing;

            doc.setFontSize(10);
            doc.setFont(undefined, 'normal');

            Object.entries(data).forEach(([key, value]) => {
                doc.setFont(undefined, 'bold');
                addText(`${key}:`, leftMargin, cursorY);
                doc.setFont(undefined, 'normal');
                addText(value, leftMargin + 40, cursorY);
                cursorY += lineSpacing;
            });
            cursorY += sectionSpacing / 2;
        }

        // --- PDF Content ---
        doc.setFontSize(18);
        doc.setFont(undefined, 'bold');
        doc.text('Document Change Request Summary', doc.internal.pageSize.getWidth() / 2, cursorY, { align: 'center' });
        cursorY += sectionSpacing;

        addSection('Request Details', {
            'Request ID': request.id,
            'Document Title': request.step1.documentTitle,
            'Status': request.status,
            'Requestor': request.requestorName,
            'Request Date': request.requestDate,
        });

        addSection('Step 1: Initial Submission', {
            'Change Type': request.step1.changeType,
            'Document Number': request.step1.documentNumber,
            'Revision': request.step1.documentRevision,
            'Department Affected': request.step1.departmentAffected,
            'Reason for Change': request.step1.changeReason,
        });

        if (request.step2?.review) {
             addSection('Step 2: Department Review', {
                'Decision': request.step2.review.decision,
                'Reviewer': request.step2.review.reviewerName,
                'Date': request.step2.review.date,
                'Comments': request.step2.review.comments,
            });
        }
        
         if (request.step3?.review) {
             addSection('Step 3: Reviewer Approval', {
                'Decision': request.step3.review.decision,
                'Reviewer': request.step3.review.reviewerName,
                'Date': request.step3.review.date,
                'Comments': request.step3.review.comments,
            });
        }

        if (request.emailLog && request.emailLog.length > 0) {
            if (cursorY > 260) doc.addPage();
            doc.setFontSize(14);
            doc.setFont(undefined, 'bold');
            addText('Email Notification Log', leftMargin, cursorY);
            cursorY += lineSpacing;
            doc.setDrawColor(200);
            doc.line(leftMargin, cursorY, rightMargin, cursorY);
            cursorY += lineSpacing;
            
            doc.setFontSize(9);
            request.emailLog.forEach(log => {
                const logText = `[${log.timestamp}] ${log.event} - Sent to: ${log.recipient}`;
                addText(logText, leftMargin, cursorY);
                cursorY += lineSpacing * 0.8;
            });
        }

        doc.save(`DCR_${request.id}.pdf`);
    };

    const activeRequests = requests.filter(req => req.status !== WorkflowStatus.COMPLETE);
    const completedRequests = requests.filter(req => req.status === WorkflowStatus.COMPLETE);

    const filterRequests = (reqs: DocumentChangeRequest[]) => reqs.filter(req => {
        const matchesText = req.step1.documentTitle.toLowerCase().includes(filter.toLowerCase()) ||
                            req.step1.documentNumber.toLowerCase().includes(filter.toLowerCase()) ||
                            req.id.toLowerCase().includes(filter.toLowerCase());
        const matchesStatus = statusFilter === 'All' || req.status === statusFilter;
        return matchesText && matchesStatus;
    });

    return (
        <div className="space-y-8">
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="p-4 border-b border-gray-200 sm:flex sm:items-center sm:justify-between">
                    <div className="flex-1 min-w-0">
                         <input
                            type="text"
                            placeholder="Filter by title, number, or ID..."
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-blue-light focus:border-brand-blue-light sm:text-sm"
                        />
                    </div>
                    <div className="mt-2 sm:mt-0 sm:ml-4">
                         <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value as WorkflowStatus | 'All')}
                            className="block w-full py-2 pl-3 pr-10 text-base border-gray-300 rounded-md focus:outline-none focus:ring-brand-blue-light focus:border-brand-blue-light sm:text-sm"
                         >
                            <option value="All">All Statuses</option>
                            {Object.values(WorkflowStatus).map(status => (
                                <option key={status} value={status}>{status}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <RequestTable requests={filterRequests(activeRequests)} onSelectRequest={onSelectRequest} onDownloadPdf={handleGeneratePdf} showDownloadAction={false} />
            </div>

            {completedRequests.length > 0 && (
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <button 
                        onClick={() => setCompletedVisible(!completedVisible)}
                        className="w-full p-4 border-b border-gray-200 flex items-center justify-between text-left"
                    >
                        <h2 className="text-lg font-medium text-gray-700">Completed Requests ({completedRequests.length})</h2>
                        <ChevronDownIcon className={`w-6 h-6 text-gray-400 transition-transform ${completedVisible ? 'rotate-180' : ''}`} />
                    </button>
                    {completedVisible && (
                         <RequestTable requests={filterRequests(completedRequests)} onSelectRequest={onSelectRequest} onDownloadPdf={handleGeneratePdf} showDownloadAction={true} />
                    )}
                </div>
            )}
        </div>
    );
};

export default RequestList;