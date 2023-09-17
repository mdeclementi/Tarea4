import { InputText } from 'primereact/inputtext';

function SearchBar(props) {

    const filtrarPostsHandler = (event) => {
        //console.log(props.posts);
        //console.log(event.target.value);
        const filteredData = props.posts.filter((item) => item.texto.includes(event.target.value));
        //console.log(filteredData);
        props.setPostsFiltrados(filteredData);
    };

    return (
        <div className="grid mt-2">
            <div className="col-12">
                <div className="text-center">
                    <span className="p-input-icon-left">
                        <i className="pi pi-search" />
                        <InputText placeholder="Search" className="p-inputtext-lg" onInput={filtrarPostsHandler} />
                    </span>
                </div>
            </div>
        </div>
    )
}

export default SearchBar;