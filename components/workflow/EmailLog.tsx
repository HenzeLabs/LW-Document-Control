import React from 'react';
import { EmailLogEntry } from '../../types';

interface EmailLogProps {
    log: EmailLogEntry[];
}

const EmailLog: React.FC<EmailLogProps> = ({ log }) => {
    return (
        <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Email Notification Log</h3>
            </div>
            <div className="border-t border-gray-200">
                <ul role="list" className="divide-y divide-gray-200">
                    {log.length > 0 ? (
                        log.map((entry, index) => (
                            <li key={index} className="px-4 py-4 sm:px-6">
                                <div className="flex items-center justify-between">
                                    <p className="text-sm font-medium text-brand-blue truncate">{entry.event}</p>
                                    <div className="ml-2 flex-shrink-0 flex">
                                        <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                                            {entry.timestamp}
                                        </p>
                                    </div>
                                </div>
                                <div className="mt-2 sm:flex sm:justify-between">
                                    <div className="sm:flex">
                                        <p className="flex items-center text-sm text-gray-500">
                                            Sent to: {entry.recipient}
                                        </p>
                                    </div>
                                </div>
                            </li>
                        ))
                    ) : (
                        <li className="px-4 py-4 sm:px-6 text-sm text-center text-gray-500">
                            No email notifications sent yet.
                        </li>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default EmailLog;
