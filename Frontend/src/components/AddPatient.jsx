import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
 
 // PatientSearchBox Component
 const PatientSearchBox = ({ searchQuery, setSearchQuery, isSearching }) => {
   return (
     <div className="relative mb-6">
       <input 
         type="text"
         value={searchQuery}
         onChange={(e) => setSearchQuery(e.target.value)}
         placeholder="Enter patient name..."
         className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition duration-200"
       />
       <span className="absolute left-3 top-3.5 text-gray-400">
         <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
         </svg>
       </span>
       {isSearching && (
         <span className="absolute right-3 top-3.5 text-blue-500">
           <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
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
   const genderColors = {
     Male: "bg-blue-100 text-blue-800",
     Female: "bg-pink-100 text-pink-800",
     Other: "bg-purple-100 text-purple-800"
   };
   
   return (
     <div className="flex justify-between items-center border border-gray-200 rounded-lg p-4 hover:bg-blue-50 transition-colors shadow-sm">
       <div className="flex items-center gap-4">
         <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 font-semibold text-xl">
           {avatarLetter}
         </div>
         <div>
           <h3 className="font-medium text-gray-800">{patient.name}</h3>
           <div className="flex items-center gap-2 mt-1">
             <span className="text-sm text-gray-600">{patient.age} yrs</span>
             <span className="w-1.5 h-1.5 bg-gray-300 rounded-full"></span>
             <span className={`px-2 py-0.5 rounded-full text-xs ${genderColors[patient.gender] || "bg-gray-100 text-gray-800"}`}>
               {patient.gender}
             </span>
             <span className="w-1.5 h-1.5 bg-gray-300 rounded-full"></span>
             <span className="text-sm font-medium text-gray-700">{patient.condition}</span>
           </div>
         </div>
       </div>
       <button 
         onClick={() => onAddPatient(patient)}
         className={`px-4 py-2 rounded-lg text-white font-medium transition-all transform hover:scale-105 ${
           isLinked 
             ? "bg-green-500 hover:bg-green-600" 
             : "bg-blue-500 hover:bg-blue-600"
         }`}
       >
         {isLinked ? (
           <div className="flex items-center gap-1">
             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
             </svg>
             <span>Added</span>
           </div>
         ) : (
           <div className="flex items-center gap-1">
             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
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
     <div className="space-y-4">
       {searchResults.length === 0 && searchQuery.trim() !== "" && !isSearching ? (
         <div className="text-center py-10 bg-gray-50 rounded-lg border border-gray-200 border-dashed">
           <svg className="w-12 h-12 mx-auto text-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
           </svg>
           <p className="text-gray-500">No patients found matching "<span className="font-medium">{searchQuery}</span>"</p>
           <p className="text-sm mt-2 text-gray-400">Try a different search term</p>
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
         <div className="flex justify-center py-12">
           <div className="w-10 h-10 border-t-4 border-b-4 border-blue-500 rounded-full animate-spin"></div>
         </div>
       )}
     </div>
   );
 };
 
 const mockPatients = [
  { id: 1, name: "Rajesh Kumar", age: 45, gender: "Male", condition: "Hypertension" },
  { id: 2, name: "Priya Sharma", age: 32, gender: "Female", condition: "Diabetes" },
  { id: 3, name: "Amit Patel", age: 56, gender: "Male", condition: "Arthritis" },
  { id: 4, name: "Meera Singh", age: 28, gender: "Female", condition: "Asthma" },
  { id: 5, name: "Vikram Malhotra", age: 67, gender: "Male", condition: "Heart Disease" },
  { id: 6, name: "Neha Agarwal", age: 41, gender: "Female", condition: "Migraine" },
  { id: 7, name: "Suresh Gupta", age: 39, gender: "Male", condition: "Anxiety" },
  { id: 8, name: "Ananya Reddy", age: 52, gender: "Female", condition: "Osteoporosis" },
];
 
 // Toast notification function
 const toast = (message) => {
   // Simple implementation - in a real app, you'd use a proper toast library
   const toastElement = document.createElement("div");
   toastElement.className = "fixed top-4 right-4 bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 transform transition-all duration-500 ease-in-out";
   toastElement.textContent = message;
   document.body.appendChild(toastElement);
   
   setTimeout(() => {
     toastElement.classList.add("opacity-0");
     setTimeout(() => document.body.removeChild(toastElement), 500);
   }, 3000);
 };
 
 // LinkedPatients Component
 const LinkedPatients = ({ linkedPatients, onRemovePatient }) => {
   return (
     <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
       <h2 className="text-xl font-semibold mb-6 text-gray-800 flex items-center gap-2">
         <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
         </svg>
         Your Patients
       </h2>
       
       {linkedPatients.length === 0 ? (
         <div className="text-center py-10 bg-gray-50 rounded-lg border border-gray-200 border-dashed">
           <svg className="w-14 h-14 mx-auto text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
           </svg>
           <p className="text-gray-500 font-medium">No patients added yet</p>
           <p className="text-sm mt-2 text-gray-400">Search and add patients to your list</p>
         </div>
       ) : (
         <div className="space-y-3">
           {linkedPatients.map(patient => (
             <div key={patient.id} className="flex justify-between items-center p-3 border border-gray-200 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors">
               <div className="flex items-center gap-3">
                 <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium">
                   {patient.name.charAt(0).toUpperCase()}
                 </div>
                 <div>
                   <h3 className="font-medium text-gray-800">{patient.name}</h3>
                   <p className="text-xs text-gray-600">{patient.condition}</p>
                 </div>
               </div>
               <button 
                 onClick={() => onRemovePatient(patient.id)}
                 className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-100 transition-colors"
                 title="Remove patient"
               >
                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                 </svg>
               </button>
             </div>
           ))}
 
           <div className="mt-6 pt-4 border-t border-gray-200">
             <div className="bg-blue-100 rounded-lg p-3 flex items-center justify-between">
               <div className="text-sm font-medium text-blue-800">Total patients</div>
               <div className="bg-blue-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">
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
     <div className="bg-white rounded-lg shadow-md p-6">
       <h2 className="text-xl font-semibold mb-6 text-gray-800 flex items-center gap-2">
         <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
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
 
   // Search for patients when query changes
   useEffect(() => {
     if (searchQuery.trim() === "") {
       setSearchResults([]);
       return;
     }
 
     setIsSearching(true);
     
     // Fetch patients from API
     const fetchPatients = async () => {
       try {
         const response = await fetch(
           `${import.meta.env.VITE_API_URL}/api/patients/all?search=${encodeURIComponent(searchQuery)}`,
           {
             credentials: 'include'
           }
         );
         
         if (!response.ok) {
           throw new Error('Failed to fetch patients');
         }
         
         const data = await response.json();
         setSearchResults(data.patients);
       } catch (error) {
         console.error('Error fetching patients:', error);
         toast('Failed to fetch patients');
       } finally {
         setIsSearching(false);
       }
     };
 
     const timeoutId = setTimeout(fetchPatients, 500);
     return () => clearTimeout(timeoutId);
   }, [searchQuery]);
 
   // Handle adding patient to doctor
   const handleAddPatient = async (patient) => {
     try {
       // Check if patient is already linked
       if (linkedPatients.some(p => p.id === patient.id)) {
         toast("Patient is already linked to your account");
         return;
       }

       // Check if we have the doctor ID
       if (!doctorId) {
         toast("Doctor ID not found");
         return;
       }

       const response = await fetch(`${import.meta.env.VITE_API_URL}/api/patients/add-to-doctor`, {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json',
         },
         credentials: 'include',
         body: JSON.stringify({
           doctorId: doctorId,
           patientId: patient.id
         })
       });

       if (!response.ok) {
         throw new Error('Failed to add patient');
       }

       // Update linked patients
       setLinkedPatients([...linkedPatients, patient]);
       toast("Patient added successfully");
     } catch (error) {
       console.error('Error adding patient:', error);
       toast("Failed to add patient");
     }
   };
 
   // Handle removing linked patient
   const handleRemovePatient = (patientId) => {
     setLinkedPatients(linkedPatients.filter(p => p.id !== patientId));
     toast("Patient removed from your list");
   };
 
   // Modify the useEffect for fetching linked patients
   useEffect(() => {
     const fetchLinkedPatients = async () => {
       if (!doctorId) return;

       try {
         // Update the endpoint to match the backend route
         const response = await fetch(
           `${import.meta.env.VITE_API_URL}/api/doctors/${doctorId}/patients`,
           {
             method: 'GET',
             headers: {
               'Content-Type': 'application/json',
             },
             credentials: 'include'
           }
         );

         if (!response.ok) {
           throw new Error('Failed to fetch linked patients');
         }

         const data = await response.json();
         console.log('Linked patients data:', data);

         // The response will now have a patients array
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
         toast('Failed to fetch linked patients');
       }
     };

     fetchLinkedPatients();
   }, [doctorId]);
 
   return (
     <div className="min-h-screen bg-gray-100"> 
       <header className="bg-white shadow-sm border-b border-gray-200">
         <div className="container mx-auto px-4 py-4">
           <div className="flex items-center justify-between">
             <div className="flex items-center gap-2">
               <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path>
               </svg>
               <h1 className="text-xl font-bold text-gray-800">MediConnect</h1>
             </div>
             <div className="flex items-center gap-4">
               <button className="text-gray-600 hover:text-gray-800">
                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
                 </svg>
               </button>
               <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                 D
               </div>
             </div>
           </div>
         </div>
       </header>
       
       <main className="container mx-auto px-4 py-8">
         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
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