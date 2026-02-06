"use client";

export default function FormControls({ controls, formData, setFormData }) {
  return controls.map((controlItem) => (
    <div className="mb-4" key={controlItem.name}>
      <label className="block text-gray-700 text-sm font-bold mb-2">
        {controlItem.label}
      </label>
      {controlItem.type === "select" ? (
        <select
          name={controlItem.name}
          id={controlItem.name}
          value={formData[controlItem.name] || ""}
          onChange={(e) => {
            setFormData({
              ...formData,
              [controlItem.name]: e.target.value,
            });
          }}
          className="shadow border rounded w-full py-2 px-3 text-gray-700 tracking-wide focus:outline-none focus:shadow-outline"
        >
          <option value="">{controlItem.placeholder}</option>
          {controlItem.options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          placeholder={controlItem.placeholder}
          type={controlItem.type}
          name={controlItem.name}
          id={controlItem.name}
          value={formData[controlItem.name]}
          onChange={(e) => {
            setFormData({
              ...formData,
              [controlItem.name]: e.target.value,
            });
          }}
          className="shadow border rounded w-full py-2 px-3 text-gray-700 tracking-wide focus:outline-none focus:shadow-outline"
        />
      )}
    </div>
  ));
}
