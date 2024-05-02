import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Task, TaskUpdateProps } from "../types";

interface TaskUpdateProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (taskID: string, formData: TaskUpdateProps) => void;
}

const TaskUpdate: React.FC<TaskUpdateProps> = ({ isOpen, onClose, onSubmit }) => {
    const [editingTask, setEditingTask] = useState<Task | null>(null);
    const [formData, setFormData] = useState<TaskUpdateProps>({
        id: '',
        title: '',
        description: '',
        dateTime: new Date().toISOString().substring(0, 10), // Convertendo para o formato de data aceito pelo input do tipo "date"
        duration: 0,
        active: true
    });

    useEffect(() => {
        if (editingTask) {
            setFormData({
                _id: editingTask._id,
                _title: editingTask._title,
                _description: editingTask._description,
                _dateTime: editingTask._dateTime, // Convertendo para o formato de data aceito pelo input do tipo "date"
                _duration: editingTask._duration,
                _active: editingTask._active
            });
        }
    }, [editingTask]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingTask) {
            onSubmit(editingTask._id, formData);
        }
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
                <ModalHeader>Editar Tarefa</ModalHeader>
                <ModalBody>
                    <form onSubmit={handleSubmit}>
                        <FormControl>
                            <FormLabel htmlFor="title">Title</FormLabel>
                            <Input
                                type="text"
                                id="title"
                                value={formData._title}
                                onChange={handleInputChange}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor="description">Description</FormLabel>
                            <Input
                                type="text"
                                id="description"
                                value={formData._description}
                                onChange={handleInputChange}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor="dateTime">Date Time</FormLabel>
                            <Input
                                type="date"
                                id="dateTime"
                                value={formData._dateTime} // Removendo a conversão toString()
                                onChange={handleInputChange}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor="duration">Duration</FormLabel>
                            <Input
                                type="number"
                                id="duration"
                                value={formData._duration}
                                onChange={handleInputChange}
                            />
                        </FormControl>
                    </form>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={onClose} mr={3}>Cancelar</Button>
                    <Button type="submit" colorScheme="blue" onClick={handleSubmit}>Atualizar</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default TaskUpdate;
