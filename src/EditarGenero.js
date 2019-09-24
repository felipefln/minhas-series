import React, { useState, useEffect} from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

const EditarGenero = ({match}) => {
    const [name, setName] = useState('')
    const [success, setSuccess] = useState(false)

    useEffect(() => {
        axios
        .get('/api/genres/'+match.params.id)
        .then(res => {
            setName(res.data.name)
        })
    }, [match.params.id])

    const onChange = event => {
        setName(event.target.value)
    }
    
    const save = () => {
        axios.put('/api/genres/' + match.params.id, {
            name
        })
        .then(res => {
            setSuccess(true)
        })
    }
    if (success) {
        return <Redirect to='/generos' />
    }

    return (
        <div className='container'>
            <h1>Editar Genêro</h1>
            <form>
                <div className="form-group">
                    <label htmlFor="name">Nome</label>
                    <input type="text"  value={name} onChange={onChange} className="form-control" id='name' placeholder="Nome do Genêros"/>
                </div>
                <button type='button' className='btn btn-primary' onClick={save}>Salvar</button>
            </form>
        </div>
    )
}

export default EditarGenero