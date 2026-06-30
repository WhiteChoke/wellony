package git.whitechoke.wellony.controller;

import git.whitechoke.wellony.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/users")
@AllArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping
    public ResponseEntity<?> getUserInfo() {
        var info = userService.getUserInfoById();

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(info);
    }

    @GetMapping("/avatar/{id}")
    public ResponseEntity<?> getUserAvatar(@PathVariable Long id) {
        var avatar = userService.getAvatar(id);
        return  ResponseEntity.ok()
                .contentType(MediaType.IMAGE_PNG)
                .header(HttpHeaders.CACHE_CONTROL, "max-age=86400")
                .body(avatar);
    }


    @GetMapping("/search")
    public ResponseEntity<?> findByUsername(
            @RequestParam("username") String username
    ) {
        var found = userService.searchByUsername(username);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(found);
    }

}
