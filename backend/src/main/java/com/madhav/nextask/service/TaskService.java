package com.madhav.nextask.service;

import com.madhav.nextask.entity.Task;
import com.madhav.nextask.entity.Status;
import com.madhav.nextask.entity.Priority;
import com.madhav.nextask.repository.TaskRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class TaskService {

    private final TaskRepository taskRepository;

    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    public Task createTask(Task task) {
        // Set default values for missing fields
        if (task.getStatus() == null) {
            task.setStatus(Status.ACTIVE);
        }
        if (task.isCompleted() == false && task.getStatus() == Status.INACTIVE) {
            task.setStatus(Status.ACTIVE);
        }
        if (task.getPriority() == null) {
            task.setPriority(Priority.LOW);
        }
        task.setCreatedAt(LocalDateTime.now());
        task.setUpdatedAt(LocalDateTime.now());
        return taskRepository.save(task);
    }

    public List<Task> getTasksByUserId(Long userId) {
        return taskRepository.findByUserId(userId);
    }

    public Task getTaskById(Long id) {
        return taskRepository.findById(id).orElse(null);
    }

    public void deleteTask(Long id) {
        taskRepository.deleteById(id);
    }

    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    public Task updateTask(Long id, Task updatedTask) {

        Task task = taskRepository.findById(id).orElse(null);

        if (task == null) {
            return null;
        }

        task.setTitle(updatedTask.getTitle() != null ? updatedTask.getTitle() : task.getTitle());
        task.setDescription(
                updatedTask.getDescription() != null ? updatedTask.getDescription() : task.getDescription());
        task.setPriority(updatedTask.getPriority() != null ? updatedTask.getPriority() : task.getPriority());
        task.setStatus(updatedTask.getStatus() != null ? updatedTask.getStatus() : task.getStatus());
        task.setDueDate(updatedTask.getDueDate() != null ? updatedTask.getDueDate() : task.getDueDate());
        task.setCompleted(updatedTask.isCompleted());
        task.setUpdatedAt(LocalDateTime.now());

        return taskRepository.save(task);
    }

}
