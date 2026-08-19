interface Props {
  title: string;
  description: string;
}

export default function ModuleCard({
  title,
  description,
}: Props) {
  return (
    <div className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition">
      <h2 className="text-xl font-semibold text-emerald-700">
        {title}
      </h2>

      <p className="text-gray-600 mt-2">
        {description}
      </p>

      <button className="mt-5 bg-emerald-600 text-white px-5 py-2 rounded-lg hover:bg-emerald-700">
        Open Module
      </button>
    </div>
  );
}