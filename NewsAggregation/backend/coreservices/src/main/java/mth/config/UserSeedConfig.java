package mth.config;

import java.util.List;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import mth.models.Users;
import mth.repository.UsersRepository;

@Configuration
public class UserSeedConfig {

    @Bean
    CommandLineRunner seedCurrentUsers(UsersRepository usersRepository) {
        return args -> {
            if (usersRepository.count() > 0) {
                return;
            }

            usersRepository.saveAll(List.of(
                    createUser("NewsSphere Admin", "admin@newssphere.ai", "9000000001", "1234", 3, 1),
                    createUser("Priya Raman", "priya.raman@newssphere.ai", "9000000002", "1234", 2, 1),
                    createUser("Alex Reader", "alex.reader@example.com", "9000000003", "1234", 1, 1),
                    createUser("Rahul Menon", "rahul.menon@example.com", "9000000004", "1234", 1, 0)));
        };
    }

    private Users createUser(String fullname, String email, String phone, String password, int role, int status) {
        Users user = new Users();
        user.setFullname(fullname);
        user.setEmail(email);
        user.setPhone(phone);
        user.setPassword(password);
        user.setRole(role);
        user.setStatus(status);
        user.setTotalShares(0);
        user.setTotalBookmarks(0);
        user.setReadingStreak(0);
        user.setLastLogin("Not logged in yet");
        return user;
    }
}
