import React, { useState, FormEvent } from 'react';

import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import Input from '../../components/Input';
import Select from '../../components/Select';

import './styles.css';
import api from '../../services/api';

function TeacherList() {
    const [teachers, setTeachers] = useState([]);

    const [subject, setSubject] = useState('');
    const [week_day, setWeekDay] = useState('');
    const [time, setTime] = useState('');

    async function searchTeachers( e: FormEvent ){
        e.preventDefault();
        
        const response = await api.get('/classes', {
            params: {
                subject,
                week_day,
                time
            }
        });

        setTeachers(response.data);

    }

    return (
        <div id="page-teacher-list" className="container">
            <PageHeader title="Estes são os proffys disponíveis">
                <form id="search-teachers" onSubmit={searchTeachers}>
                    <Select
                        name="subject"
                        label="Matéria"
                        value={subject}
                        onChange={ (e) => { setSubject(e.target.value) }}
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
                     <Select
                        name="week_day"
                        label="Dia da semana"
                        value={week_day}
                        onChange={ (e) => { setWeekDay(e.target.value) }}
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
                        value={time}
                        onChange={ (e) => { setTime(e.target.value) }}
                        type="time"
                        name="time"
                        label="Hora"
                     />

                     <button type="submit">
                        <img src="https://img.icons8.com/cute-clipart/64/000000/search.png"/>
                     </button>
                    
                </form>    
            </PageHeader> 

            <main>
                {teachers.map((teacher: Teacher) => {
                    return <TeacherItem key={teacher.id} teacher={teacher}/>;
                })}                
            </main>            
        </div>
    )
}

export default TeacherList;