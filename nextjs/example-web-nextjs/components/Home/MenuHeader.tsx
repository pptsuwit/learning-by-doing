export default function MenuHeader(props: any) {
  return (
    <div className="items-center text-center mt-5">
      <div className={`xs:text-2xl ${props.size || "sm:text-6xl"}  font-bold justify-center`}>
        <span className="" style={{ color: "#0097E8" }}>
          &mdash; &ensp;
        </span>
        {props.header}

        <span className="" style={{ color: "#0097E8" }}>
          &ensp;&mdash;
        </span>
      </div>
    </div>
  );
}
