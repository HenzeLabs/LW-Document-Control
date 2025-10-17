import React, { useState, useContext, useEffect } from 'react';
// FIX: Import WorkflowStatus enum to use for new request status.
import { WorkflowStatus, type DocumentChangeRequest } from '../types';
import { MOCK_REQUESTS } from '../constants';
import { AuthContext } from '../contexts/AuthContext';
import Header from '../components/Header';
import RequestList from '../components/RequestList';
import RequestDetailPage from './RequestDetailPage';
import { PlusIcon, InformationCircleIcon } from '../components/Icons';
import WorkflowHelpModal from '../components/workflow/WorkflowHelpModal';

const DashboardPage: React.FC = () => {
    const [requests, setRequests] = useState<DocumentChangeRequest[]>([]);
    const [selectedRequest, setSelectedRequest] = useState<DocumentChangeRequest | null>(null);
    const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        // Simulate fetching data
        setRequests(MOCK_REQUESTS);
    }, []);

    const handleSelectRequest = (request: DocumentChangeRequest) => {
        setSelectedRequest(request);
    };

    const handleBackToList = () => {
        setSelectedRequest(null);
    };

    const handleUpdateRequest = (updatedRequest: DocumentChangeRequest) => {
        setRequests(prevRequests => 
            prevRequests.map(r => r.id === updatedRequest.id ? updatedRequest : r)
        );
        // If viewing details, update the selected request as well
        if(selectedRequest && selectedRequest.id === updatedRequest.id) {
            setSelectedRequest(updatedRequest);
        }
    };

    const handleCreateNewRequest = () => {
        // Find the highest existing request number to avoid collisions
        const existingNumbers = requests
            .map(r => parseInt(r.id.split('-')[2], 10))
            .filter(n => !isNaN(n));
        const maxNumber = Math.max(0, ...existingNumbers);
        const newNumber = maxNumber + 1;
        
        const newId = `DCR-2025-${String(newNumber).padStart(3, '0')}`;
        
        const today = new Date();
        today.setFullYear(2025);
        const requestDate = today.toISOString().split('T')[0];
        
        const newRequest: DocumentChangeRequest = {
            id: newId,
            // FIX: Use WorkflowStatus enum member instead of a string literal.
            status: WorkflowStatus.DRAFT,
            requestorId: user.id,
            requestorName: user.name,
            requestDate: requestDate,
            step1: {
                changeType: null,
                documentTitle: '',
                documentNumber: '',
                documentRevision: '',
                subDocumentInfo: '',
                departmentAffected: '',
                changeReason: '',
                requestorInitials: '',
                attachments: [],
            },
        };
        setRequests(prev => [newRequest, ...prev]);
        setSelectedRequest(newRequest);
    };

    if (!user) return null;

    return (
        <div className="flex flex-col h-screen">
            <Header />
            <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
                {selectedRequest ? (
                    <RequestDetailPage
                        request={selectedRequest} 
                        onBack={handleBackToList} 
                        onUpdateRequest={handleUpdateRequest}
                    />
                ) : (
                    <div className="max-w-7xl mx-auto">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center space-x-3">
                                <h1 className="text-3xl font-bold text-gray-800">Document Change Requests</h1>
                                <button onClick={() => setIsHelpModalOpen(true)} className="text-gray-400 hover:text-brand-blue" title="Workflow Documentation">
                                    <InformationCircleIcon className="w-7 h-7" />
                                </button>
                            </div>
                            <button 
                                onClick={handleCreateNewRequest}
                                className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-brand-blue rounded-md shadow-sm hover:bg-brand-blue-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-blue-light transition-colors">
                                <PlusIcon className="w-5 h-5 mr-2 -ml-1" />
                                New Request
                            </button>
                        </div>
                        <RequestList requests={requests} onSelectRequest={handleSelectRequest} />
                    </div>
                )}
            </main>
            <WorkflowHelpModal isOpen={isHelpModalOpen} onClose={() => setIsHelpModalOpen(false)} />
        </div>
    );
};

export default DashboardPage;