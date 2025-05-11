import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { initialData } from "./AdminPage";
import RecursiveDataset from "./RecursiveDataset";

const ViewDataset = () => {

  const handleDelete = (targetId) => {
    const deleteRecursively = (node) => {
      if (!node.children) return false;
      console.log(1);
      node.children = node.children.filter(child => child.id !== targetId);
      node.children.forEach(deleteRecursively);
      return true;
    };
  
    // Special case: don't delete the root
    if (dataset.id === targetId) return;
  
    const newData = structuredClone(dataset);
    deleteRecursively(newData);
    setDataset(newData);
  };
  const handleEdit = (updatedItem) => {
    const updateRecursively = (node) => {
      if (node.id === updatedItem.id) {
        Object.assign(node, updatedItem);
        return;
      }
      node.children?.forEach(updateRecursively);
    };
  
    const newData = structuredClone(dataset);
    updateRecursively(newData);
    setDataset(newData);
  };
  
  const { _id } = useParams();

  const baseDataset = initialData.find((d) => d.id.toString() === _id);
  console.log(_id);

  const [dataset, setDataset] = useState(structuredClone(baseDataset));

  const handleAddChild = (parentId) => {
    const newChild = {
      id: Date.now(),
      name: "New Child Dataset",
      description: "New child description",
      status: "Draft",
      children: [],
    };

    const addChildRecursively = (node) => {
      if (node.id === parentId) {
        node.children = [...(node.children || []), newChild];
        return true;
      }
      return node.children?.some(addChildRecursively);
    };

    const newData = structuredClone(dataset);
    addChildRecursively(newData);
    setDataset(newData);
  };

  if (!dataset) return <div className="text-center text-red-500">Dataset not found</div>;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-white text-center mb-6">Dataset Details</h1>
      <RecursiveDataset data={dataset} onAddChild={handleAddChild} onDelete={handleDelete} onEdit={handleEdit} />
    </div>
  );
};

export default ViewDataset;
