import { useState } from "react";
import {
  Search,
  ChevronDown,
  MoreHorizontal,
  Edit,
  Trash,
  FileText,
} from "lucide-react";
import StatusBadge from "../components/StatusBadge";
import ActionMenu from "../components/ActionMenu";

export default function InventoryTable() {
  const [selectedTab, setSelectedTab] = useState("cars");
  const [accessories, setAccessories] = useState([
    {
      id: 1,
      name: "LED Lights",
      category: "Exterior",
      price: 199,
      stock: 50,
      sold: 10,
      status: "In Stock",
    },
    // Add more accessories...
  ]);
  const [cars, setCars] = useState([
    {
      id: 1,
      name: "LED Lights",
      category: "Exterior",
      price: 199,
      stock: 50,
      sold: 10,
      status: "In Stock",
    },
    // Add more accessories...
  ]);

  const [editingAccessory, setEditingAccessory] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleEditAccessory = (accessory) => {
    setEditingAccessory(accessory);
    setIsEditing(true);
  };

  const handleDeleteAccessory = (id) => {
    setAccessories(accessories.filter((acc) => acc.id !== id));
  };

  const handleUpdateStock = (id, newStock) => {
    setAccessories(
      accessories.map((acc) =>
        acc.id === id ? { ...acc, stock: newStock } : acc
      )
    );
  };

  return (
    <div className="bg-white rounded-lg shadow">
      {/* Table Header */}
      <div className="p-6 border-b">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Inventory</h2>
          <div className="flex items-center gap-4">
            <div className="flex items-center bg-gray-100 rounded-lg">
              <Search className="h-5 w-5 ml-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search inventory..."
                className="bg-transparent border-none focus:outline-none px-3 py-2 w-64"
              />
            </div>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Export
            </button>
          </div>
        </div>

        <div className="flex gap-6 mt-6">
          <button
            active={selectedTab === "cars"}
            onClick={() => setSelectedTab("cars")}
            count={cars.length}
          >
            Cars
          </button>
          <button
            active={selectedTab === "accessories"}
            onClick={() => setSelectedTab("accessories")}
            count={accessories.length}
          >
            Accessories
          </button>
        </div>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto">
        {selectedTab === "cars" ? (
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th>Make & Model</th>
                <th>Type</th>
                <th>Year</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {cars.map((car) => (
                <tr key={car.id} className="border-b">
                  <td>
                    <div>
                      <div className="font-medium">{car.make}</div>
                      <div className="text-gray-500">{car.model}</div>
                    </div>
                  </td>
                  <td>{car.type}</td>
                  <td>{car.year}</td>
                  <td>${car.price.toLocaleString()}</td>
                  <td>{car.stock}</td>
                  <td>
                    <StatusBadge
                      status={car.stock > 0 ? "In Stock" : "Out of Stock"}
                    />
                  </td>
                  <td>
                    <ActionMenu />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Sold</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {accessories.map((accessory) => (
                <tr key={accessory.id} className="border-b">
                  <td>
                    <div className="font-medium">{accessory.name}</div>
                  </td>
                  <td>{accessory.category}</td>
                  <td>${accessory.price}</td>
                  <td>
                    <input
                      type="number"
                      value={accessory.stock}
                      onChange={(e) =>
                        handleUpdateStock(accessory.id, e.target.value)
                      }
                      className="w-16 border rounded p-1"
                    />
                  </td>
                  <td>{accessory.sold}</td>
                  <td>
                    <StatusBadge status={accessory.status} />
                  </td>
                  <td>
                    <ActionMenu
                      onEdit={() => handleEditAccessory(accessory)}
                      onDelete={() => handleDeleteAccessory(accessory.id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

// import { useState } from "react"
// import { Search, ChevronDown, MoreHorizontal, Edit, Trash, FileText } from "lucide-react"

// export default function InventoryTable() {
//   const [selectedTab, setSelectedTab] = useState("cars")

//   const cars = [
//     {
//       id: 1,
//       make: "Toyota",
//       model: "Camry",
//       year: 2023,
//       price: 25000,
//       stock: 5,
//       type: "Sedan",
//     },
//     // Add more cars...
//   ]

//   const accessories = [
//     {
//       id: 1,
//       name: "LED Lights",
//       category: "Exterior",
//       price: 199,
//       stock: 50,
//     },
//     // Add more accessories...
//   ]

//   return (
//     <div className="bg-white rounded-lg shadow">
//       {/* Table Header */}
//       <div className="p-6 border-b">
//         <div className="flex items-center justify-between">
//           <h2 className="text-xl font-semibold">Inventory</h2>
//           <div className="flex items-center gap-4">
//             <div className="flex items-center bg-gray-100 rounded-lg">
//               <Search className="h-5 w-5 ml-3 text-gray-400" />
//               <input
//                 type="text"
//                 placeholder="Search inventory..."
//                 className="bg-transparent border-none focus:outline-none px-3 py-2 w-64"
//               />
//             </div>
//             <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Export</button>
//           </div>
//         </div>

//         <div className="flex gap-6 mt-6">
//           <button active={selectedTab === "cars"} onClick={() => setSelectedTab("cars")} count={cars.length}>
//             Cars
//           </button>
//           <button
//             active={selectedTab === "accessories"}
//             onClick={() => setSelectedTab("accessories")}
//             count={accessories.length}
//           >
//             Accessories
//           </button>
//         </div>
//       </div>

//       {/* Table Content */}
//       <div className="overflow-x-auto">
//         {selectedTab === "cars" ? (
//           <table className="w-full">
//             <thead>
//               <tr className="border-b">
//                 <th>Make & Model</th>
//                 <th>Type</th>
//                 <th>Year</th>
//                 <th>Price</th>
//                 <th>Stock</th>
//                 <th>Status</th>
//                 <th></th>
//               </tr>
//             </thead>
//             <tbody>
//               {cars.map((car) => (
//                 <tr key={car.id} className="border-b">
//                   <td>
//                     <div>
//                       <div className="font-medium">{car.make}</div>
//                       <div className="text-gray-500">{car.model}</div>
//                     </div>
//                   </td>
//                   <td>{car.type}</td>
//                   <td>{car.year}</td>
//                   <td>${car.price.toLocaleString()}</td>
//                   <td>{car.stock}</td>
//                   <td>
//                     <StatusBadge status={car.stock > 0 ? "In Stock" : "Out of Stock"} />
//                   </td>
//                   <td>
//                     <ActionMenu />
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         ) : (
//           <table className="w-full">
//             <thead>
//               <tr className="border-b">
//                 <th>Name</th>
//                 <th>Category</th>
//                 <th>Price</th>
//                 <th>Stock</th>
//                 <th>Status</th>
//                 <th></th>
//               </tr>
//             </thead>
//             <tbody>
//               {accessories.map((accessory) => (
//                 <tr key={accessory.id} className="border-b">
//                   <td>
//                     <div className="font-medium">{accessory.name}</div>
//                   </td>
//                   <td>{accessory.category}</td>
//                   <td>${accessory.price}</td>
//                   <td>{accessory.stock}</td>
//                   <td>
//                     <StatusBadge status={accessory.stock > 0 ? "In Stock" : "Out of Stock"} />
//                   </td>
//                   <td>
//                     <ActionMenu />
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </div>
//     </div>
//   )
// }

// function button({ active, onClick, children, count }) {
//   return (
//     <button
//       onClick={onClick}
//       className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
//         active ? "bg-blue-50 text-blue-600" : "text-gray-500 hover:text-gray-700"
//       }`}
//     >
//       <span>{children}</span>
//       <span className={`px-2 py-0.5 rounded-full text-sm ${active ? "bg-blue-100" : "bg-gray-100"}`}>{count}</span>
//     </button>
//   )
// }

// function th({ children }) {
//   return (
//     <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
//       <div className="flex items-center gap-1">
//         {children}
//         <ChevronDown className="h-4 w-4" />
//       </div>
//     </th>
//   )
// }

// function td({ children }) {
//   return <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{children}</td>
// }

// function StatusBadge({ status }) {
//   const colors = {
//     "In Stock": "bg-green-50 text-green-700",
//     "Out of Stock": "bg-red-50 text-red-700",
//     "Low Stock": "bg-yellow-50 text-yellow-700",
//   }

//   return (
//     <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${colors[status]}`}>
//       {status}
//     </span>
//   )
// }

// function ActionMenu() {
//   const [isOpen, setIsOpen] = useState(false)

//   return (
//     <div className="relative">
//       <button onClick={() => setIsOpen(!isOpen)} className="p-1 rounded-full hover:bg-gray-100">
//         <MoreHorizontal className="h-5 w-5 text-gray-400" />
//       </button>

//       {isOpen && (
//         <div className="absolute right-0 mt-1 w-48 rounded-lg bg-white shadow-lg border">
//           <div className="py-1">
//             <MenuItem icon={<Edit />} text="Edit" />
//             <MenuItem icon={<FileText />} text="View Details" />
//             <MenuItem icon={<Trash />} text="Delete" danger />
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }

// function MenuItem({ icon, text, danger }) {
//   return (
//     <button
//       className={`flex items-center gap-2 w-full px-4 py-2 text-sm ${
//         danger ? "text-red-600 hover:bg-red-50" : "text-gray-700 hover:bg-gray-50"
//       }`}
//     >
//       {icon}
//       <span>{text}</span>
//     </button>
//   )
// }
