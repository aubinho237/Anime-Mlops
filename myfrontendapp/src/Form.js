import './Form.css';

function Form() {

    return (
        <form className="my-form">
      <div className="form-left">
        <label htmlFor="title">Title</label>
        <input id="title" type="text" />

        <label htmlFor="genre">Genre(s)</label>
        <input id="genre" type="text" />

        <label htmlFor="description">Description</label>
        <textarea id="description" rows="4" />
      </div>

      <div className="form-right">
        <label htmlFor="type">Type</label>
        <input id="type" type="text" />

        <label htmlFor="producer">Producer</label>
        <input id="producer" type="text" />

        <label htmlFor="studio">Studio</label>
        <input id="studio" type="text" />

        <button type="submit">Submit</button>
      </div>
    </form>
      );
}

export default Form;
