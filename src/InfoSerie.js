import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import { Badge } from 'reactstrap'

const InfoSerie = ({ match }) => {
    const [form, setForm] = useState({
        name: ''
    })
    const [data, setData] = useState({})
    const [genres, setGenres] = useState([])
    const [genreId, setGenreId] = useState('')

    useEffect(() => {
        axios.get('/api/series/' + match.params.id)
            .then(res => {
                setData(res.data)
                setForm(res.data)
            })


    }, [match.params.id])
    useEffect(() => {
        axios.get('/api/genres/')
            .then(res => {
                setGenres(res.data.data)
                const generos = res.data.data
                const idEncontrado = generos.find(value => data.genre === value.name)
                if(idEncontrado){
                    setGenreId(idEncontrado)
                }
            })
    }, [data])


    const [success, setSuccess] = useState(false)
    const [mode, setMode] = useState('EDIT')

    const masterHeader = {
        height: '50vh',
        minHeight: '500px',
        backgroundImage: `url('${data.background}')`,
        backgoundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
    }

    const onChange = field => event => {
        // setName(event.target.value)
        setForm({
            ...form,
            [field]: event.target.value
        })
    }

    const onChangeGenre = event => {
        setGenreId(event.target.value)
    }
    const seleciona = value => () => {
        setForm({
            ...form,
            status: value
        })
    }

    const save = () => {
        console.log(form, genreId)
        axios.put('/api/series/' + match.params.id, {
            ...form,
            genre_id: genreId
        }
            
        )
            .then(res => {
                setSuccess(true)
            })
    }
    if (success) {
        return <Redirect to='/series' />
    }
    return (
        <div>
            <header style={masterHeader}>
                <div className='h-100 ' style={{ background: 'rgba(0,0,0,0.7)' }}>
                    <div className='h-100 container'>
                        <div className='row h-100 align-items-center'>
                            <div className='col-3'>
                                <img className='img-fluid img-thumbnail' alt={data.name} src={data.poster} />
                            </div>
                            <div className='col-8'>
                                <h1 className='font-weight-light text-white'>{data.name}</h1>
                                <div className='lead text-white'>
                                    {data.status === 'ASSISTIDO' && <Badge color='success'>Assistido</Badge>}
                                    {data.status === 'PARA_ASSISTIR' && <Badge color='warning'>Para assistir</Badge>}
                                    Gênero: {data.genre}
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </header>
            <div className='container'>
                <button className='btn btn-primary' onClick={() => setMode('EDIT')}>Editar</button>
            </div>
            {
                mode === 'EDIT' &&
                <div className='container'>
                    <h1>Nova Série</h1>
                    <button className='btn btn-primary' onClick={() => setMode('INFO')}>Cancelar Edição</button>
                    <form>
                        <div className="form-group">
                            <label htmlFor="name">Nome</label>
                            <input type="text" value={form.name} onChange={onChange('name')} className="form-control" id='name' placeholder="Nome da Série" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="comments">Comentários</label>
                            <input type="text" value={form.comments} onChange={onChange('comments')} className="form-control" id='comment' placeholder="Comentário sobre a série" />
                        </div>
                        <label htmlFor="genre">Genêro</label>
                        <select className="form-control" onChange={onChangeGenre} value={genreId}>

                            {genres.map(genero => <option key={genero.id} value={genero.id}>{genero.name}</option>)}
                        </select>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" checked={form.status === 'ASSISTIDO'} name='status' id='assistido' value='ASSISTIDO' onChange={seleciona('ASSISTIDO')}/>
                                <label className="form-check-label" htmlFor="assistido">
                                    Assistido
                                </label>
                            
                        </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" checked={form.status === 'PARA_ASSISTIR'} name="status" id="paraAssistir" value="PARA_ASSISTIR" onChange={seleciona('PARA_ASSISTIR')}/>
                                    <label className="form-check-label" htmlFor='paraAssistir'>
                                        Para assistir
                                    </label>
                                
                            </div>
                                <button type='button' className='btn btn-primary' onClick={save}>Salvar</button>
                            </form>
                        </div>
                        }
                    </div>
                    )
                }
export default InfoSerie