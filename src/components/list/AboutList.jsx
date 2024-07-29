import reasons from "../../mocks/data/about-us.json";
export default function AboutList() {
  return (
    <div className="breadcrumbs text-xs sm:text-sm">
      <ul>
        {reasons.map((reason, index) => (
          <li key={index}>{reason}</li>
        ))}
      </ul>
    </div>
  );
}
