package git.whitechoke.wellony.web;

import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.ConstraintViolationException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.time.Instant;

@Slf4j
@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ExceptionResponseDto> generalExceptionHandler(Exception e) {
        log.error("Handle exception ", e);

        var response = ExceptionResponseDto.builder()
                .message("Internal server error")
                .detailMessage(e.getMessage())
                .timestamp(Instant.now())
                .build();

        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(response);
    }

    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<ExceptionResponseDto> entityNotFoundExceptionHandler(Exception e) {
        log.error("Handle entity not found exception ", e);

        var response = ExceptionResponseDto.builder()
                .message("Not found")
                .detailMessage(e.getMessage())
                .timestamp(Instant.now())
                .build();

        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(response);
    }

    @ExceptionHandler({MethodArgumentNotValidException.class, ConstraintViolationException.class})
    public ResponseEntity<ExceptionResponseDto> invalidDataException(Exception e) {
        log.error("Handle invalid data exception ", e);

        var response = ExceptionResponseDto.builder()
                .message("Invalid data")
                .detailMessage(e.getMessage())
                .timestamp(Instant.now())
                .build();

        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(response);
    }
}
