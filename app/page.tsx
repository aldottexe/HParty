import { Bar } from "@/public/components/Bar";

let connections = [
  { name: "Leon", hp: 20, max: 50 },
  { name: "Athel", hp: 10, max: 30 },
  { name: "Mills", hp: 15, max: 20 },
];

let user = { name: "freb", hp: 25, max: 30 };

export default function Home() {
  return (
    <div className="mx-auto mt-20 w-[80%]">
      <section>
        <h1 className="text-3xl mb-5">HParty</h1>

        <ul>
          {connections.map((c, i) => (
            <li key={i}>
              <Bar charInfo={c} />
            </li>
          ))}
        </ul>

      </section>
<hr className="my-10"/>

      <section>
        <Bar charInfo={user} />
      </section>
    </div>
  );
}

