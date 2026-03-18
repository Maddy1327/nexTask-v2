package com.madhav.nextask.entity;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.madhav.nextask.config.FlexibleLocalDateTimeDeserializer;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "tasks")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private String description;

    private Long userId;

    @JsonDeserialize(using = FlexibleLocalDateTimeDeserializer.class)
    private LocalDateTime dueDate;

    private boolean completed;

    @Enumerated(EnumType.STRING)
    private Status status;

    @Enumerated(EnumType.STRING)
    private Priority priority;



    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
