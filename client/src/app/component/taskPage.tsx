import React, { useEffect, useState } from 'react';
import { Box, Button, Text, VStack, Flex, useDisclosure, SimpleGrid, Card, Heading, Tag } from '@chakra-ui/react';
import api from '../api/api';
import { Task, Tags, TaskCreateProps } from '../types';
import TaskForm from './taskForm';
import { format } from 'date-fns';

const TaskPage = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const { isOpen, onOpen, onClose } = useDisclosure();

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await api.get('task/tasks');
                console.log('Tasks fetched:', response.data);
                setTasks(response.data); // Certifique-se de que response.data é um array de tarefas
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        };

        fetchTasks();
    }, []);

    const formatDate = (date: Date) => {
        return format(date, 'dd/MM/yyyy');
    };

    const handleSubmit = async (formData: TaskCreateProps) => {
        try {
            const response = await api.post('task/create', formData);
            console.log('Data saved:', response.data);
            setTasks((prevTasks: Task[]) => [...prevTasks, response.data]);
            onClose();
        } catch (error) {
            console.error('Error saving data:', error);
        }
    };

    return (
        <Box w={700} border={1} borderColor='red.200'>
            <VStack spacing={4} align="stretch">
                <Button onClick={onOpen}>Adicionar Tarefa</Button>
                <TaskForm isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} />

                <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(200px, 1fr))'>
                    {tasks.map((task: Task) => (
                        <Card key={task._id}>
                            <Flex p={2} borderWidth="1px" borderRadius="md" direction="column" alignItems="start">
                                <Heading size='md'>{task._title}</Heading>
                                <Text>{task._description}</Text>
                                <Text>{formatDate(task._dateTime)}</Text>
                                <Text>{task._duration}hrs</Text>
                                {task._tags?.map((tags: Tags) =>
                                    <Tag>{tags._name}</Tag>
                                )}
                            </Flex>
                        </Card>
                    ))}
                </SimpleGrid>

            </VStack>
        </Box >
    );
};

export default TaskPage;
