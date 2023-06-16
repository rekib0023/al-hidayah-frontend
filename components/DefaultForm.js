export default function DefaultForm({
  fields,
  handleOnSubmit,
  otherActionBtn = null,
  errMsg = null,
}) {
  return (
    <div className="">
      {errMsg && (
        <div className="bg-secondary bg-opacity-20 text-secondary rounded text-center py-2 mt-4">
          <h1>{errMsg}</h1>
        </div>
      )}
      <form onSubmit={handleOnSubmit}>
        {fields.map((field) => (
          <div key={field.id} className="mb-4">
            <label
              htmlFor={field.id}
              className="block text-gray-700 text-sm font-bold mb-"
            >
              {field.label}
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id={field.id}
              placeholder={field.placeholder}
              type={field.inputType}
              value={field.value}
              onChange={(e) => field.cb(e.target.value)}
            />
          </div>
        ))}
        <div className="flex items-center justify-between gap-2">
          <button
            className="btn-primary focus:outline-none focus:shadow-outline w-full"
            type="submit"
          >
            Submit
          </button>
          {otherActionBtn && otherActionBtn}
        </div>
      </form>
    </div>
  );
}
