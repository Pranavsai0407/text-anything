import React, { useState } from "react";
import { Eye, Pencil, Trash2, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const initialData = [
  {
    id: 1,
    name: "Parent Dataset 1",
    description: "This is a parent dataset.",
    status: "Active",
    children: [
      {
        id: 11,
        name: "Child Dataset 1",
        description: "This is a child dataset.",
        status: "Draft",
        children: [
          {
            id: 111,
            name: "Grandchild Dataset 1",
            description: "This is a grandchild dataset.",
            status: "Active",
          },
        ],
      },
    ],
  },
];

const statusColor = {
  Active: "badge-success",
  Inactive: "badge-error",
  Draft: "badge-warning",
};

const DatasetCard = ({ data, level = 0, handleDelete }) => {
  const [showChildren, setShowChildren] = useState(false);
  const navigate = useNavigate();

  return (
    <div className={`card bg-base-200 shadow-lg mb-4 w-full max-w-[1000px] mx-auto ml-${level * 4}`}>
      <div className="card-body p-6">
        <div className="flex justify-between items-start flex-col sm:flex-row gap-4">
          <div>
            <h2 className="card-title text-lg sm:text-2xl font-semibold">{data.name}</h2>
            <p className="text-sm text-gray-400">{data.description}</p>
            <span className={`badge mt-2 ${statusColor[data.status] || "badge-outline"}`}>
              {data.status}
            </span>
          </div>
          <div className="flex gap-2 flex-wrap">
            <button
              className="btn btn-outline btn-sm"
              onClick={() => navigate(`/viewDataset/${data.id}`)}
            >
              <Eye className="w-4 h-4 mr-1" /> View
            </button>
            <button
              className="btn btn-error btn-sm text-white"
              onClick={() => handleDelete(data.id)}
            >
              <Trash2 className="w-4 h-4 mr-1" /> Delete
            </button>
          </div>
        </div>

        {showChildren && (
          <div className="mt-4 space-y-4">
            {data.children?.map((child) => (
              <DatasetCard
                key={child.id}
                data={child}
                level={level + 1}
                handleDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};


const AdminPage = () => {
  const [datasets, setDatasets] = useState(initialData);
  const [showModal, setShowModal] = useState(false);
  const [newDataset, setNewDataset] = useState({
    name: "",
    description: "",
    status: "Draft",
  });

  const handleAddDataset = () => {
    const newEntry = {
      id: Date.now(),
      ...newDataset,
      children: [],
    };
    setDatasets([...datasets, newEntry]);
    setNewDataset({ name: "", description: "", status: "Draft" });
    setShowModal(false);
  };
  const handleDeleteDataset = (idToDelete) => {
    const deleteRecursively = (datasets) =>
      datasets
        .map((dataset) => {
          if (dataset.id === idToDelete) return null;
          if (dataset.children) {
            dataset.children = deleteRecursively(dataset.children);
          }
          return dataset;
        })
        .filter(Boolean); // remove null entries
  
    setDatasets((prev) => deleteRecursively(prev));
  };
  

  return (
    <div className="p-6 min-h-screen bg-base-100 w-full max-w-none">
      <div className="flex justify-between items-center mb-8 w-full">
        <h1 className="text-4xl font-bold text-white text-center w-full">Admin Panel</h1>
        <div className="absolute right-6">
          <button
            className="btn btn-primary text-white"
            onClick={() => setShowModal(true)}
          >
            <Plus className="w-5 h-5 mr-2" /> Add Dataset
          </button>
        </div>
      </div>

      <div className="space-y-6">
      {datasets.map((dataset) => (
  <DatasetCard key={dataset.id} data={dataset} handleDelete={handleDeleteDataset} />
))}
      </div>

      {/* Modal */}
      {showModal && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-base-200 text-base-content p-6 rounded-lg shadow-lg w-full max-w-md">
      <h2 className="text-xl font-semibold mb-4">Add New Dataset</h2>
      <div className="form-control mb-2">
        <label className="label text-base-content">Name</label>
        <input
          className="input input-bordered bg-base-100 text-base-content"
          value={newDataset.name}
          onChange={(e) =>
            setNewDataset({ ...newDataset, name: e.target.value })
          }
        />
      </div>
      <div className="form-control mb-2">
        <label className="label text-base-content">Description</label>
        <textarea
          className="textarea textarea-bordered bg-base-100 text-base-content"
          value={newDataset.description}
          onChange={(e) =>
            setNewDataset({ ...newDataset, description: e.target.value })
          }
        />
      </div>
      <div className="form-control mb-4">
        <label className="label text-base-content">Status</label>
        <select
          className="select select-bordered bg-base-100 text-base-content"
          value={newDataset.status}
          onChange={(e) =>
            setNewDataset({ ...newDataset, status: e.target.value })
          }
        >
          <option>Active</option>
          <option>Inactive</option>
          <option>Draft</option>
        </select>
      </div>
      <div className="flex justify-end gap-2">
        <button className="btn btn-success" onClick={handleAddDataset}>
          Add
        </button>
        <button className="btn btn-neutral" onClick={() => setShowModal(false)}>
          Cancel
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default AdminPage;
