import React, { useEffect, useState } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './Patients.css';

function Contacts() {
  const [contacts, setContacts] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: ""
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const fetchContacts = async () => {
    try {
      const res = await fetch("http://localhost:8081/api/contact/all");
      const data = await res.json();
      setContacts(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (contact) => {
    setEditId(contact.id);
    setEditData(contact);
  };

  const handleInputChange = (e) => {
    setEditData({
      ...editData,
      [e.target.name]: e.target.value
    });
  };

  const saveContact = async () => {

    await fetch(`http://localhost:8081/api/contact/update/${editId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(editData)
    });
  
    setEditId(null);
    fetchContacts();
  };

  const deleteContact = async (id) => {

    if (!window.confirm("Delete this contact?")) return;
  
    await fetch(`http://localhost:8081/api/contact/delete/${id}`, {
      method: "DELETE"
    });
  
    fetchContacts();
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const totalPages = Math.ceil(contacts.length / itemsPerPage);
  const paginatedContacts = contacts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="contacts-container bg-white p-6 rounded-xl shadow-md border border-gray-200">
 {/* Header Section */}
<div className="heading-container mb-8">
  <h1>
    <i className="bi bi-person-lines-fill text-white text-3xl"></i>
    Contact Messages
  </h1>
</div>


      <div className="table-wrapper">
        <table className="contacts-table text-sm border border-gray-300">
          <thead>
          <tr>
  <th className="p-3 border bg-[#00B7AA] text-black">Sr. No.</th>
  <th className="p-3 border bg-[#00B7AA] text-black">First Name</th>
  <th className="p-3 border bg-[#00B7AA] text-black">Last Name</th>
  <th className="p-3 border bg-[#00B7AA] text-black">Email</th>
  <th className="p-3 border bg-[#00B7AA] text-black">Phone</th>
  <th className="p-3 border bg-[#00B7AA] text-black">Message</th>
  <th className="p-3 border bg-[#00B7AA] text-black">Actions</th>
</tr>

          </thead>
          <tbody>
          {paginatedContacts.map((c, index) => (
  <tr key={c.id} className="transition-all duration-200 hover:bg-gray-50">
    <td className="border p-3">{(currentPage - 1) * itemsPerPage + index + 1}</td>
    <td className="border p-3">
{editId===c.id ? (
<input
name="firstName"
value={editData.firstName}
onChange={handleInputChange}
/>
):(
c.firstName
)}
</td>
<td className="border p-3">
{editId===c.id ? (
<input
name="lastName"
value={editData.lastName}
onChange={handleInputChange}
/>
):(
c.lastName
)}
</td>
<td className="border p-3">
{editId===c.id ? (
<input
name="email"
value={editData.email}
onChange={handleInputChange}
/>
):(
c.email
)}
</td>
<td className="border p-3">
{editId===c.id ? (
<input
name="phone"
value={editData.phone}
onChange={handleInputChange}
/>
):(
c.phone
)}
</td>
<td className="border p-3">
{editId===c.id ? (
<textarea
name="message"
value={editData.message}
onChange={handleInputChange}
/>
):(
c.message
)}
</td>

<td className="border p-3">

{editId===c.id ? (

<button
onClick={saveContact}
className="bg-green-200 px-3 py-1 rounded"
>
Save
</button>

):(

<>
<button
onClick={()=>handleEdit(c)}
className="bg-blue-200 px-3 py-1 rounded me-2"
>
Edit
</button>

<button
onClick={()=>deleteContact(c.id)}
className="bg-red-200 px-3 py-1 rounded"
>
Delete
</button>

</>

)}

</td>
   
  </tr>
))}

            {contacts.length === 0 && (
              <tr>
                <td colSpan="6" className="p-6 text-center text-gray-500">
                  No contact messages found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="pagination mt-4 flex justify-center gap-2">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="pagination-btn"
          title="Previous"
        >
          <i className="bi bi-chevron-left"></i>
        </button>

        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="pagination-btn"
          title="Next"
        >
          <i className="bi bi-chevron-right"></i>
        </button>
      </div>
      <footer className="admin-footer text-center text-light py-3">
  <div>&copy; {new Date().getFullYear()} Developed by CDAC All Rights Reserved.</div>
</footer>
    </div>
  );
}

export default Contacts;
