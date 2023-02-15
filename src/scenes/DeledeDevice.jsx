const DeleteDevice = () => {
  const onSubmitHandler = (ev) => {
    alert(JSON.stringify(ev));
  };
  return (
    <form onSubmit={onSubmitHandler}>
      <input name="pag" defaultValue="" type="text"/>
       
      <button type="submit">מחיקה</button>
    </form>
  );
};

export default DeleteDevice;
