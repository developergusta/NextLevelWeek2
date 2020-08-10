import React, {useState, FormEvent} from 'react';
import { useHistory } from 'react-router-dom';

import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';
import Textarea from '../../components/Textarea';
import Select from '../../components/Select';

import warningIcon from '../../assets/images/icons/warning.svg';
import './styles.css';
import api from '../../services/api';

function TeacherForm() {
    const history = useHistory();

    const [ name, setName ] = useState('');
    const [ avatar, setAvatar ] = useState('');
    const [ whatsapp, setWhatsapp ] = useState('');
    const [ bio, setBio ] = useState('');

    const [ subject, setSubject ] = useState('');
    const [ cost, setCost ] = useState('');

    const [scheduleItems, setSchedulItems] = useState([
        { week_day: 0, from: '', to: '' }
    ]);


    function addNewScheduleItem(){
        setSchedulItems([
            ...scheduleItems,
            { week_day: 0, from: '', to: '' }

        ]);
    }

    function setSchedulItemValue(position: number, field: string, value: string){
        const updatedScheduleItem = scheduleItems.map((scheduleItem, index) => {
            if (index === position){
                return { ...scheduleItem, [field]: value };
            }

            return scheduleItem;
        });

        setSchedulItems(updatedScheduleItem);
    }

    function handleCreateClass(e: FormEvent){
        e.preventDefault();

        api.post('/classes', {
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost: Number(cost),
            schedule: scheduleItems
        }).then(() => {
            alert('Cadastro realizado com sucesso!');

            history.push('/');
        }).catch(() => {
            alert('Erro no cadastro!');
        })
    }

    return (
        <div id="page-teacher-form" className="container">
            <PageHeader 
            title="Que incrível que você quer dar aulas"
            description="O primeiro passo é preencher esse formulário de inscrição"
            />

            <main>
                <form onSubmit={handleCreateClass}>
                    <fieldset>
                        <legend>Seus dados</legend>

                        <Input
                            name="name"
                            label="Nome completo"
                            value={name}
                            onChange={ (e) => { setName(e.target.value) } }
                        />
                        <Input
                            name="avatar"
                            label="Avatar"
                            value={avatar}
                            onChange={ (e) => { setAvatar(e.target.value) } }
                        />
                        <Input
                            name="whataspp"
                            label="Whatsapp"
                            value={whatsapp}
                            onChange={ (e) => { setWhatsapp(e.target.value) } }
                        />

                        <Textarea 
                            name= "bio"
                            label= "Biografia"
                            value={bio}
                            onChange={ (e) => { setBio(e.target.value) } }
                        />
                        
                    </fieldset>
                    <fieldset>
                        <legend>Sobre a aula</legend>

                        <Select
                            name="subject"
                            label="Matéria"
                            value={subject}
                            onChange={ (e) => { setSubject(e.target.value) } }
                            options={[
                                { value: 'artes', label: 'Artes' },
                                { value: 'biologia', label: 'Biologia' },
                                { value: 'educacao_fisica', label: 'Educação Física' },
                                { value: 'espanhol', label: 'Espanhol' },
                                { value: 'fisica', label: 'Física' },
                                { value: 'geografia', label: 'Geografia' },
                                { value: 'historia', label: 'História' },
                                { value: 'ingles', label: 'Inglês' },
                                { value: 'matematica', label: 'Matemática' },
                                { value: 'portugues', label: 'Português' },
                                { value: 'quimica', label: 'Química' }
                            ]}
                        />
                        <Input
                            name="cost"
                            label="Custo da sua matéria por aula"
                            value={cost}
                            onChange={ (e) => { setCost(e.target.value) } }
                        />
                    </fieldset>
                    <fieldset>
                        <legend>Horários disponíveis
                            <button type="button" onClick={addNewScheduleItem}>
                                + Novo horário
                            </button>
                        </legend>      

                        {scheduleItems.map((scheduleItem, index) => {
                            return (
                                <div key={scheduleItem.week_day} className="schedule-item">
                                    <Select
                                        name="week_day"
                                        label="Dia da semana"
                                        value={scheduleItem.week_day}
                                        onChange={e => setSchedulItemValue(index, 'week_day', e.target.value)}
                                        options={[
                                            { value: '0', label: 'Segunda-feira' },
                                            { value: '1', label: 'Terça-feira' },
                                            { value: '2', label: 'Quarta-feira' },
                                            { value: '3', label: 'Quinta-feira' },
                                            { value: '4', label: 'Sexta-feira' },
                                            { value: '5', label: 'Sábado' },
                                            { value: '6', label: 'Domingo' },
                                        ]}
                                    />
                                    <Input 
                                    onChange={e => setSchedulItemValue(index, 'from', e.target.value)} 
                                    value={scheduleItem.from}
                                    name="from" 
                                    label="Das" 
                                    type="time" 
                                    />
                                    <Input 
                                    onChange={e => setSchedulItemValue(index, 'to', e.target.value)} 
                                    value={scheduleItem.to}
                                    name="to" 
                                    label="Até" 
                                    type="time" 
                                    />
                                </div>         
                            );
                        })}                         
                    </fieldset>

                    <footer>
                        <p>
                            <img src={warningIcon} alt="Aviso importante"/>
                            Importante! <br/> 
                            Preencha todos os dados
                        </p>
                        <button type="submit">
                            Salvar cadastro
                        </button>
                    </footer>
                </form>
            </main>

        </div>
    )
}

export default TeacherForm;