import React, { useState } from 'react';
import { FormControl, FormLabel, Input, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter } from '@chakra-ui/react';
import { TaskCreateProps } from '../types';
interface TaskFormProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (formData: TaskCreateProps) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ isOpen, onClose, onSubmit }) => {

    const [formData, setFormData] = useState<TaskCreateProps>({ id: '', title: '', description: '', dateTime: new Date(), duration: 0, active: true });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
        setFormData({ id: '', title: '', description: '', dateTime: new Date(), duration: 0, active: true });
        onClose();
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        const parsedValue = id === 'duration' ? parseInt(value, 10) : value;
        setFormData((prev) => ({ ...prev, [id]: parsedValue }));
    };


    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Adicionar Tarefa</ModalHeader>
                <ModalBody>
                    <form onSubmit={handleSubmit}>
                        <FormControl>
                            <FormLabel htmlFor="title">Title</FormLabel>
                            <Input
                                type="text"
                                id="title"
                                value={formData.title}
                                onChange={handleInputChange}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor="description">Description</FormLabel>
                            <Input
                                type="text"
                                id="description"
                                value={formData.description}
                                onChange={handleInputChange}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor="dateTime">Date Time</FormLabel>
                            <Input
                                type="Date"
                                id="dateTime"
                                value={(formData.dateTime).toString()}
                                onChange={handleInputChange}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor="duration">Duration</FormLabel>
                            <Input
                                type="number"
                                id="duration"
                                value={formData.duration}
                                onChange={handleInputChange}
                            />
                        </FormControl>
                    </form>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={onClose} mr={3}>Cancelar</Button>
                    <Button type="submit" colorScheme="blue" onClick={handleSubmit}>Adicionar</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default TaskForm;
