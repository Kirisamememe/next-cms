// import React, { useState, useEffect } from 'react';

// const styles = {
//   container: {
//     fontFamily: "'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
//     maxWidth: '1200px',
//     margin: '0 auto',
//     padding: '20px',
//     backgroundColor: '#f8f9fa',
//     borderRadius: '8px',
//     boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
//   },
//   header: {
//     fontSize: '24px',
//     fontWeight: 'bold',
//     marginBottom: '20px',
//     color: '#333',
//   },
//   fileInput: {
//     display: 'none',
//   },
//   fileInputLabel: {
//     display: 'inline-block',
//     padding: '10px 15px',
//     backgroundColor: '#007bff',
//     color: 'white',
//     borderRadius: '4px',
//     cursor: 'pointer',
//     transition: 'background-color 0.3s',
//   },
//   preview: {
//     backgroundColor: 'white',
//     border: '1px solid #dee2e6',
//     borderRadius: '4px',
//     padding: '15px',
//     marginTop: '20px',
//     overflowX: 'auto',
//   },
//   previewHeader: {
//     fontSize: '18px',
//     fontWeight: 'bold',
//     marginBottom: '10px',
//     color: '#495057',
//   },
//   selectButton: {
//     width: '20px',
//     height: '20px',
//     borderRadius: '50%',
//     border: 'none',
//     cursor: 'pointer',
//     display: 'inline-flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginLeft: '5px',
//     fontSize: '16px',
//     fontWeight: 'bold',
//     transition: 'all 0.3s',
//   },
//   table: {
//     width: '100%',
//     borderCollapse: 'collapse',
//     marginTop: '20px',
//     backgroundColor: 'white',
//     boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
//   },
//   th: {
//     backgroundColor: '#f8f9fa',
//     color: '#495057',
//     padding: '12px',
//     borderBottom: '2px solid #dee2e6',
//     textAlign: 'left',
//     position: 'relative',
//   },
//   td: {
//     padding: '12px',
//     borderBottom: '1px solid #dee2e6',
//   },
//   sortButton: {
//     background: 'none',
//     border: 'none',
//     cursor: 'pointer',
//     marginLeft: '5px',
//   },
//   filterInput: {
//     width: '100%',
//     padding: '5px',
//     marginTop: '5px',
//     border: '1px solid #ced4da',
//     borderRadius: '4px',
//   },
//   error: {
//     color: '#dc3545',
//     backgroundColor: '#f8d7da',
//     border: '1px solid #f5c6cb',
//     borderRadius: '4px',
//     padding: '10px',
//     marginTop: '20px',
//     fontFamily: 'monospace',
//     whiteSpace: 'pre-wrap',
//   },
//   button: {
//     padding: '8px 12px',
//     margin: '0 5px',
//     backgroundColor: '#28a745',
//     color: 'white',
//     border: 'none',
//     borderRadius: '4px',
//     cursor: 'pointer',
//     transition: 'background-color 0.3s',
//   },
//   select: {
//     padding: '8px',
//     marginLeft: '10px',
//     borderRadius: '4px',
//     border: '1px solid #ced4da',
//   },
// };

// const FlexibleJSONViewer = () => {
//   const [data, setData] = useState([]);
//   const [selectedPaths, setSelectedPaths] = useState([]);
//   const [error, setError] = useState('');
//   const [errorLine, setErrorLine] = useState('');
//   const [previewData, setPreviewData] = useState('');
//   const [sortConfig, setSortConfig] = useState({ key: '', direction: 'ascending' });
//   const [filters, setFilters] = useState({});
//   const [savedFilters, setSavedFilters] = useState({});
//   const [selectedFilter, setSelectedFilter] = useState('');

//   useEffect(() => {
//     const loadedFilters = JSON.parse(localStorage.getItem('savedFilters') || '{}');
//     setSavedFilters(loadedFilters);
//   }, []);

//   const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
//     if (!event.currentTarget.files) return null
//     const file = event.currentTarget.files[0];
//     const reader = new FileReader();

//     reader.onload = (e) => {
//       if (!e.target?.result) return
//       const content = e.target.result.toString();

//       try {
//         const preprocessedContent = content.replace(/}\s*{/g, '},\n{')
//         const parsedData = JSON.parse(`[${preprocessedContent}]`)

//         if (parsedData.length > 0) {
//           setData(parsedData);
//           setPreviewData(parsedData[0]);
//           setSelectedPaths([]);
//           setError('');
//           setErrorLine('');
//         } else {
//           setError("The file appears to be empty or contains no valid JSON objects.");
//           setErrorLine('');
//         }
//       } catch (err: any) {
//         if (!err) return
//         setError(`Error parsing JSON: ${(err.message) || ''}`);
//         setErrorLine(content.split('\n')[0]);
//         setData([]);
//         setSelectedPaths([]);
//       }
//     };

//     reader.onerror = (e) => {
//       if (!e.target?.result) return
//       setError("Error reading file: " + e.target.error);
//       setErrorLine('');
//     };

//     reader.readAsText(file);
//   };

//   const handleSelectPath = (path: string[]) => {
//     const pathString = path.join('.');
//     setSelectedPaths(prev =>
//       prev.includes(pathString)
//         ? prev.filter(p => p !== pathString)
//         : [...prev, pathString]
//     );
//   };

//   const getValueByPath = (obj, path) => {
//     return path.split('.').reduce((acc, part) => acc && acc[part], obj);
//   };

//   const handleSort = (key) => {
//     let direction = 'ascending';
//     if (sortConfig.key === key && sortConfig.direction === 'ascending') {
//       direction = 'descending';
//     }
//     setSortConfig({ key, direction });
//   };

//   const handleFilter = (key, value) => {
//     setFilters(prev => ({ ...prev, [key]: value }));
//   };

//   const saveCurrentFilter = () => {
//     const filterName = prompt("Enter a name for this filter:");
//     if (filterName) {
//       const newSavedFilters = { ...savedFilters, [filterName]: selectedPaths };
//       setSavedFilters(newSavedFilters);
//       localStorage.setItem('savedFilters', JSON.stringify(newSavedFilters));
//     }
//   };

//   const applySelectedFilter = () => {
//     if (selectedFilter && savedFilters[selectedFilter]) {
//       setSelectedPaths(savedFilters[selectedFilter]);
//     }
//   };

//   const JSONPreview = ({ data, onSelectPath, selectedPaths }) => {
//     const renderValue = (value, currentPath, key = null) => {
//       const pathString = currentPath.join('.');
//       const isSelected = selectedPaths.includes(pathString);

//       const SelectButton = () => (
//         <button
//           onClick={() => onSelectPath(currentPath)}
//           style={{
//             ...styles.selectButton,
//             backgroundColor: isSelected ? '#dc3545' : '#28a745',
//             color: 'white',
//           }}
//         >
//           {isSelected ? '-' : '+'}
//         </button>
//       );

//       if (Array.isArray(value)) {
//         return (
//           <div style={{ marginLeft: '20px' }}>
//             {key && <strong>{key}: </strong>}
//             <span style={{ color: '#7952b3', fontWeight: 'bold' }}>Array [{value.length}]</span>
//             <div style={{ marginLeft: '20px' }}>
//               {value.map((item, index) => (
//                 <div key={index}>
//                   {renderValue(item, [...currentPath, index])}
//                 </div>
//               ))}
//             </div>
//           </div>
//         );
//       } else if (typeof value === 'object' && value !== null) {
//         return (
//           <div style={{ marginLeft: '20px' }}>
//             {key && <strong>{key}: </strong>}
//             <span style={{ color: '#17a2b8', fontWeight: 'bold' }}>Object</span>
//             <div style={{ marginLeft: '20px' }}>
//               {Object.entries(value).map(([k, v]) => (
//                 <div key={k}>
//                   {renderValue(v, [...currentPath, k], k)}
//                 </div>
//               ))}
//             </div>
//           </div>
//         );
//       } else {
//         return (
//           <div style={{ display: 'flex', alignItems: 'center', marginBottom: '2px' }}>
//             {key && <strong>{key}: </strong>}
//             <span style={{ color: typeof value === 'string' ? '#28a745' : '#dc3545', marginRight: '5px' }}>
//               {JSON.stringify(value)}
//             </span>
//             <SelectButton />
//           </div>
//         );
//       }
//     };

//     return (
//       <div style={styles.preview}>
//         <h3 style={styles.previewHeader}>JSON Object Preview and Path Selection</h3>
//         {renderValue(data, [])}
//       </div>
//     );
//   };

//   const sortedAndFilteredData = React.useMemo(() => {
//     let processedData = [...data];

//     // Apply filters
//     Object.keys(filters).forEach(key => {
//       const filterValue = filters[key].toLowerCase();
//       processedData = processedData.filter(item => {
//         const value = getValueByPath(item, key);
//         return value && value.toString().toLowerCase().includes(filterValue);
//       });
//     });

//     // Apply sorting
//     if (sortConfig.key) {
//       processedData.sort((a, b) => {
//         const aValue = getValueByPath(a, sortConfig.key);
//         const bValue = getValueByPath(b, sortConfig.key);
//         if (aValue < bValue) return sortConfig.direction === 'ascending' ? -1 : 1;
//         if (aValue > bValue) return sortConfig.direction === 'ascending' ? 1 : -1;
//         return 0;
//       });
//     }

//     return processedData;
//   }, [data, sortConfig, filters]);

//   return (
//     <div style={styles.container}>
//       <h1 style={styles.header}>Flexible JSON Viewer</h1>
//       <input
//         type="file"
//         onChange={handleFileUpload}
//         accept=".json,.jsonl"
//         id="fileInput"
//         style={styles.fileInput}
//       />
//       <label htmlFor="fileInput" style={styles.fileInputLabel}>
//         Choose a file
//       </label>
//       {error && (
//         <div style={styles.error}>
//           Error: {error}
//           {errorLine && (
//             <>
//               <br /><br />
//               First line of file for context:
//               <br />
//               {errorLine.length > 100 ? errorLine.substring(0, 100) + '...' : errorLine}
//             </>
//           )}
//         </div>
//       )}
//       {previewData && (
//         <>
//           <JSONPreview data={previewData} onSelectPath={handleSelectPath} selectedPaths={selectedPaths} />
//           <div style={{ marginTop: '20px' }}>
//             <button onClick={saveCurrentFilter} style={styles.button}>Save Current Filter</button>
//             <select
//               value={selectedFilter}
//               onChange={(e) => setSelectedFilter(e.target.value)}
//               style={styles.select}
//             >
//               <option value="">Select a saved filter</option>
//               {Object.keys(savedFilters).map(filterName => (
//                 <option key={filterName} value={filterName}>{filterName}</option>
//               ))}
//             </select>
//             <button onClick={applySelectedFilter} style={styles.button}>Apply Selected Filter</button>
//           </div>
//           {selectedPaths.length > 0 && (
//             <table style={styles.table}>
//               <thead>
//                 <tr>
//                   {selectedPaths.map((path, index) => (
//                     <th key={index} style={styles.th}>
//                       {path}
//                       <button onClick={() => handleSort(path)} style={styles.sortButton}>
//                         {sortConfig.key === path ? (sortConfig.direction === 'ascending' ? '▲' : '▼') : '▲▼'}
//                       </button>
//                       <input
//                         type="text"
//                         placeholder="Filter..."
//                         onChange={(e) => handleFilter(path, e.target.value)}
//                         style={styles.filterInput}
//                       />
//                     </th>
//                   ))}
//                 </tr>
//               </thead>
//               <tbody>
//                 {sortedAndFilteredData.map((row, rowIndex) => (
//                   <tr key={rowIndex}>
//                     {selectedPaths.map((path, cellIndex) => (
//                       <td key={cellIndex} style={styles.td}>
//                         {JSON.stringify(getValueByPath(row, path))}
//                       </td>
//                     ))}
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           )}
//         </>
//       )}
//     </div>
//   );
// };

// export default FlexibleJSONViewer;
