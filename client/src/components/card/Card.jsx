function Card({ info }) {

  const img_path = "https://image.tmdb.org/t/p/w500";

  return (
    <div className="font-bold bg-white shadow-t-lg rounded-t-lg">
      <img
        className="rounded-t-lg"
        src={img_path + info.backdrop_path}
        alt="TV-Show poster"
      />
      <div className="text-center">
        <div className="">{info.name}</div>
      </div>
    </div>
  );
}

export default Card;