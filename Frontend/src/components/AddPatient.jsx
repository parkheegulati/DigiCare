import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
 
 // PatientSearchBox Component
const PatientSearchBox = ({ searchQuery, setSearchQuery, isSearching }) => {
  return (
    <div className="relative mb-4">
      <input 
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Enter patient name..."
        className="w-full px-3 py-2 pl-9 border border-[#e9e9e7] dark:border-[#2f2f2f] bg-white dark:bg-[#191919] text-[#37352f] dark:text-[#e3e3e3] rounded-md text-xs focus:outline-none focus:ring-1 focus:ring-[#37352f] dark:focus:ring-[#e3e3e3] transition-colors"
      />
      <span className="absolute left-3 top-2.5 text-[#787774]">
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
        </svg>
      </span>
      {isSearching && (
        <span className="absolute right-3 top-2.5 text-[#2383e2]">
          <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </span>
      )}
    </div>
  );
};

// PatientCard Component
const PatientCard = ({ patient, isLinked, onAddPatient }) => {
  const avatarLetter = patient.name.charAt(0).toUpperCase();
  
  return (
    <div className="flex justify-between items-center border border-[#e9e9e7] dark:border-[#2f2f2f] rounded-md p-3 hover:bg-[#f7f6f3] dark:hover:bg-[#252525] bg-white dark:bg-[#191919] transition-colors">
      <div className="flex items-center gap-3">
        <div className="flex-shrink-0 w-9 h-9 bg-[#37352f] dark:bg-[#e3e3e3] rounded text-white dark:text-[#191919] flex items-center justify-center font-bold text-sm">
          {avatarLetter}
        </div>
        <div>
          <h3 className="font-semibold text-xs text-[#37352f] dark:text-[#e3e3e3]">{patient.name}</h3>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-[11px] text-[#787774] dark:text-[#9b9b9b]">{patient.age} yrs</span>
            <span className="w-1 h-1 bg-[#787774] rounded-full"></span>
            <span className="px-1.5 py-0.5 rounded text-[11px] bg-[#e9e9e7] dark:bg-[#2f2f2f] text-[#37352f] dark:text-[#e3e3e3]">
              {patient.gender}
            </span>
            <span className="w-1 h-1 bg-[#787774] rounded-full"></span>
            <span className="text-[11px] font-medium text-[#787774] dark:text-[#9b9b9b]">{patient.condition}</span>
          </div>
        </div>
      </div>
      <button 
        onClick={() => onAddPatient(patient)}
        className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
          isLinked 
            ? "bg-[#edf3ec] dark:bg-[#1c2c21] text-[#448361] border border-[#d3e5d1] dark:border-[#2b4431]" 
            : "bg-[#37352f] hover:bg-[#23211d] dark:bg-[#e3e3e3] dark:hover:bg-white text-white dark:text-[#191919]"
        }`}
      >
        {isLinked ? (
          <div className="flex items-center gap-1">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <span>Added</span>
          </div>
        ) : (
          <div className="flex items-center gap-1">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
            <span>Add Patient</span>
          </div>
        )}
      </button>
    </div>
  );
};

// SearchResults Component
const SearchResults = ({ searchResults, searchQuery, isSearching, linkedPatients, onAddPatient }) => {
  return (
    <div className="space-y-2">
      {searchResults.length === 0 && searchQuery.trim() !== "" && !isSearching ? (
        <div className="text-center py-8 bg-white dark:bg-[#191919] rounded-md border border-[#e9e9e7] dark:border-[#2f2f2f]">
          <svg className="w-10 h-10 mx-auto text-[#787774] mb-2 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <p className="text-xs text-[#787774]">No patients found matching "<span className="font-medium">{searchQuery}</span>"</p>
          <p className="text-[11px] mt-1 text-[#787774]">Try a different search term</p>
        </div>
      ) : (
        searchResults.map(patient => (
          <PatientCard 
            key={patient.id}
            patient={patient}
            isLinked={linkedPatients.some(p => p.id === patient.id)}
            onAddPatient={onAddPatient}
          />
        ))
      )}
      
      {isSearching && (
        <div className="flex justify-center py-8">
          <div className="w-6 h-6 border-2 border-[#37352f] dark:border-[#e3e3e3] border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
};

// LinkedPatients Component
const LinkedPatients = ({ linkedPatients, onRemovePatient }) => {
  return (
    <div className="bg-[#f7f6f3] dark:bg-[#202020] rounded-md border border-[#e9e9e7] dark:border-[#2f2f2f] p-4 text-left">
      <h2 className="text-sm font-bold mb-4 text-[#37352f] dark:text-[#e3e3e3] flex items-center gap-2">
        <svg className="w-4 h-4 text-[#2383e2]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
        </svg>
        Your Patients
      </h2>
      
      {linkedPatients.length === 0 ? (
        <div className="text-center py-8 bg-white dark:bg-[#191919] rounded-md border border-[#e9e9e7] dark:border-[#2f2f2f]">
          <p className="text-xs font-medium text-[#787774]">No patients added yet</p>
          <p className="text-[11px] mt-1 text-[#787774]">Search and add patients to your list</p>
        </div>
      ) : (
        <div className="space-y-2">
          {linkedPatients.map(patient => (
            <div key={patient.id} className="flex justify-between items-center p-2.5 border border-[#e9e9e7] dark:border-[#2f2f2f] rounded-md bg-white dark:bg-[#191919] hover:bg-[#f7f6f3] dark:hover:bg-[#252525] transition-colors">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 bg-[#37352f] dark:bg-[#e3e3e3] rounded text-white dark:text-[#191919] flex items-center justify-center font-bold text-xs">
                  {patient.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h3 className="font-semibold text-xs text-[#37352f] dark:text-[#e3e3e3]">{patient.name}</h3>
                  <p className="text-[11px] text-[#787774] dark:text-[#9b9b9b]">{patient.condition}</p>
                </div>
              </div>
              <button 
                onClick={() => onRemovePatient(patient.id)}
                className="text-[#c43838] hover:opacity-80 p-1 rounded transition-colors"
                title="Remove patient"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                </svg>
              </button>
            </div>
          ))}

          <div className="mt-4 pt-3 border-t border-[#e9e9e7] dark:border-[#2f2f2f]">
            <div className="bg-[#f7f6f3] dark:bg-[#252525] rounded-md p-2.5 flex items-center justify-between">
              <div className="text-xs font-medium text-[#37352f] dark:text-[#e3e3e3]">Total patients</div>
              <div className="bg-[#37352f] dark:bg-[#e3e3e3] text-white dark:text-[#191919] w-6 h-6 rounded flex items-center justify-center font-bold text-xs">
                {linkedPatients.length}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// SearchSection Component
const SearchSection = ({ 
  searchQuery, 
  setSearchQuery, 
  searchResults, 
  isSearching, 
  linkedPatients, 
  handleAddPatient 
}) => {
  return (
    <div className="bg-[#f7f6f3] dark:bg-[#202020] rounded-md border border-[#e9e9e7] dark:border-[#2f2f2f] p-4 text-left">
      <h2 className="text-sm font-bold mb-4 text-[#37352f] dark:text-[#e3e3e3] flex items-center gap-2">
        <svg className="w-4 h-4 text-[#2383e2]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16l2.879-2.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242zM21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        Find Patients
      </h2>
      
      <PatientSearchBox 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
        isSearching={isSearching} 
      />

      <SearchResults 
        searchResults={searchResults}
        searchQuery={searchQuery}
        isSearching={isSearching}
        linkedPatients={linkedPatients}
        onAddPatient={handleAddPatient}
      />
    </div>
  );
};

// Main PatientSearch Component
const PatientSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [linkedPatients, setLinkedPatients] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const location = useLocation();
  
  const doctorId = location.state?.doctorId;

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    
    const fetchPatients = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/patients/all?search=${encodeURIComponent(searchQuery)}`,
          { credentials: 'include' }
        );
        if (!response.ok) throw new Error('Failed to fetch patients');
        const data = await response.json();
        setSearchResults(data.patients);
      } catch (error) {
        console.error('Error fetching patients:', error);
      } finally {
        setIsSearching(false);
      }
    };

    const timeoutId = setTimeout(fetchPatients, 500);
    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  const handleAddPatient = async (patient) => {
    try {
      if (linkedPatients.some(p => p.id === patient.id)) return;
      if (!doctorId) return;

      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/patients/add-to-doctor`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ doctorId, patientId: patient.id })
      });

      if (!response.ok) throw new Error('Failed to add patient');
      setLinkedPatients([...linkedPatients, patient]);
    } catch (error) {
      console.error('Error adding patient:', error);
    }
  };

  const handleRemovePatient = (patientId) => {
    setLinkedPatients(linkedPatients.filter(p => p.id !== patientId));
  };

  useEffect(() => {
    const fetchLinkedPatients = async () => {
      if (!doctorId) return;

      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/doctors/${doctorId}/patients`,
          {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
          }
        );

        if (!response.ok) throw new Error('Failed to fetch linked patients');
        const data = await response.json();
        setLinkedPatients(data.patients.map(patient => ({
          id: patient.id,
          name: patient.name,
          email: patient.email,
          gender: patient.gender,
          age: patient.age,
          condition: patient.condition
        })));
      } catch (error) {
        console.error('Error fetching linked patients:', error);
      }
    };

    fetchLinkedPatients();
  }, [doctorId]);

  return (
    <div className="min-h-screen bg-white dark:bg-[#191919] pt-14 font-sans text-[#37352f] dark:text-[#e3e3e3]"> 
      <main className="max-w-5xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Section - Search */}
          <div className="col-span-1 lg:col-span-2">
            <SearchSection
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              searchResults={searchResults}
              isSearching={isSearching}
              linkedPatients={linkedPatients}
              handleAddPatient={handleAddPatient}
            />
          </div>

          {/* Right Section - Linked Patients */}
          <div className="col-span-1">
            <LinkedPatients 
              linkedPatients={linkedPatients} 
              onRemovePatient={handleRemovePatient} 
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default PatientSearch;