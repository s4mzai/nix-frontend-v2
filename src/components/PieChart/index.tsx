import { Pie } from "react-chartjs-2";

function PieChart({ data }) {
  return (
    <div className="w-1/4 ">
      {data && Object.keys(data).length > 0 && (
        <div className="m-4 p-4">
          <Pie
            data={data}
            options={{
              plugins: {
                legend: {
                  position: "left",
                  align: "center",
                },
              },
            }}
          />
        </div>
      )}
    </div>
  );
}

export default PieChart;
