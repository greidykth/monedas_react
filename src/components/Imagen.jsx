import ImagenCriptos from "../img/imagen-criptos.png";

const Imagen = () => {
  return (
    <div className="md:w2/5 mt-10">
      <img
        className="block max-w-md w-96"
        src={ImagenCriptos}
        alt="imagen criptos"
      />
    </div>
  );
};

export default Imagen;
