"use client";

import { useEffect, useState } from "react";

export default function PhantomMeshDashboard() {
  const [auditLogs, setAuditLogs] = useState<any[]>([]);
  const [swsData, setSwsData] = useState<any>(null);
  const [deptAData, setDeptAData] = useState<any>(null);

  async function fetchData() {
    try {
      const swsRes = await fetch("http://localhost:8000/business/123");
      const swsJson = await swsRes.json();
      setSwsData(swsJson);

      const deptRes = await fetch("http://localhost:8001/record/123");
      const deptJson = await deptRes.json();
      setDeptAData(deptJson);

      const auditRes = await fetch("http://localhost:8003/audit");
      const auditJson = await auditRes.json();
      setAuditLogs(auditJson.reverse());

    } catch (err) {
      console.error("Dashboard Fetch Error:", err);
    }
  }

  useEffect(() => {
    fetchData();

    const interval = setInterval(fetchData, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-3xl shadow-lg p-6 mb-6 border border-gray-200">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            PhantomMesh
          </h1>
          <p className="text-lg text-gray-600">
            Observe Everything. Touch Nothing.
          </p>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded-2xl border border-blue-200">
              <h3 className="font-semibold text-blue-900">SWS Status</h3>
              <p className="text-green-600 font-bold mt-2">Connected</p>
            </div>
            <div className="bg-green-50 p-4 rounded-2xl border border-green-200">
              <h3 className="font-semibold text-green-900">Department Systems</h3>
              <p className="text-green-600 font-bold mt-2">2 Active</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-2xl border border-purple-200">
              <h3 className="font-semibold text-purple-900">Observer Agents</h3>
              <p className="text-green-600 font-bold mt-2">Running</p>
            </div>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* SWS */}
          <div className="bg-white rounded-3xl shadow-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-900">SWS</h2>
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                Active
              </span>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-1">
                  UBID
                </label>
                <input
                  className="w-full border rounded-xl p-3"
                  value="123"
                  readOnly
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-1">
                  Business Name
                </label>
                <input
                  className="w-full border rounded-xl p-3"
                  value={swsData?.business_name || "Waiting for sync..."}
                  readOnly
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-1">
                  Business Address
                </label>
                <input
                  className="w-full border rounded-xl p-3"
                  value={swsData?.address || "Waiting for sync..."}
                  readOnly
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-1">
                  Approval Status
                </label>
                <input
                  className="w-full border rounded-xl p-3"
                  value={swsData?.status || "Waiting for sync..."}
                  readOnly
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-1">
                  Authorized Signatory
                </label>
                <input
                  className="w-full border rounded-xl p-3"
                  value={swsData?.signatory || "Waiting for sync..."}
                  readOnly
                />
              </div>

              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-2xl transition-all">
                Simulate SWS Update
              </button>
            </div>
          </div>

          {/* Department A */}
          <div className="bg-white rounded-3xl shadow-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-900">
                Department A
              </h2>
              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
                API Based
              </span>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-1">
                  Business ID
                </label>
                <input
                  className="w-full border rounded-xl p-3"
                  value="123"
                  readOnly
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-1">
                  Company Name
                </label>
                <input
                  className="w-full border rounded-xl p-3"
                  value={deptAData?.company_name || "Waiting for sync..."}
                  readOnly
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-1">
                  Location
                </label>
                <input
                  className="w-full border rounded-xl p-3"
                  value={deptAData?.location || "Waiting for sync..."}
                  readOnly
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-1">
                  Approval State
                </label>
                <input
                  className="w-full border rounded-xl p-3"
                  value={deptAData?.approval_state || "Waiting for sync..."}
                  readOnly
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-1">
                  Authorized Person
                </label>
                <input
                  className="w-full border rounded-xl p-3"
                  value={deptAData?.authorized_person || "Waiting for sync..."}
                  readOnly
                />
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
                <p className="text-blue-900 font-medium">
                  Schema Translation Active
                </p>
                <p className="text-sm text-blue-700 mt-1">
                  address → location
                </p>
              </div>
            </div>
          </div>

          {/* Department B */}
          <div className="bg-white rounded-3xl shadow-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-900">
                Department B
              </h2>
              <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-semibold">
                No API
              </span>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-1">
                  UBID
                </label>
                <input
                  className="w-full border rounded-xl p-3"
                  value="123"
                  readOnly
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-1">
                  Business Name
                </label>
                <input
                  className="w-full border rounded-xl p-3"
                  value={swsData?.business_name || "Waiting for sync..."}
                  readOnly
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-1">
                  Address
                </label>
                <input
                  className="w-full border rounded-xl p-3"
                  value={swsData?.address || "Waiting for sync..."}
                  readOnly
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-1">
                  Status
                </label>
                <input
                  className="w-full border rounded-xl p-3"
                  value={swsData?.status || "Waiting for sync..."}
                  readOnly
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-1">
                  Authorized Signatory
                </label>
                <input
                  className="w-full border rounded-xl p-3"
                  value={swsData?.signatory || "Waiting for sync..."}
                  readOnly
                />
              </div>

              <div className="bg-red-50 border border-red-200 rounded-2xl p-4">
                <p className="text-red-900 font-medium">
                  Observed via Playwright Agent
                </p>
                <p className="text-sm text-red-700 mt-1">
                  No direct integration used
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Flow Explanation */}
        <div className="bg-white rounded-3xl shadow-lg p-6 mt-6 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Live Synchronization Flow
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center text-center">
            <div className="bg-gray-50 rounded-2xl p-4 border">
              <p className="font-bold text-lg">1</p>
              <p className="mt-2">User updates Department B</p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-4 border">
              <p className="font-bold text-lg">2</p>
              <p className="mt-2">Observer detects UI change</p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-4 border">
              <p className="font-bold text-lg">3</p>
              <p className="mt-2">Sync Engine creates event</p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-4 border">
              <p className="font-bold text-lg">4</p>
              <p className="mt-2">Changes propagate to all systems</p>
            </div>
          </div>
        </div>

        {/* Audit Logs */}
        <div className="bg-white rounded-3xl shadow-lg p-6 mt-6 border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Audit Trail
            </h2>
            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
              Immutable Logs
            </span>
          </div>

          <div className="space-y-4">
            {auditLogs.map((log, index) => (
              <div
                key={index}
                className="border rounded-2xl p-4 flex flex-col md:flex-row md:items-center md:justify-between"
              >
                <div>
                  <p className="font-semibold text-gray-900">
                    Synchronization Event
                  </p>
                  <p className="text-gray-600 text-sm mt-1">
                    Source: {log.source}
                  </p>
                </div>

                <div className="mt-2 md:mt-0 text-right">
                  <p className="font-medium text-blue-700">
                    {log.address || log.value}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    {new Date(log.time).toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
