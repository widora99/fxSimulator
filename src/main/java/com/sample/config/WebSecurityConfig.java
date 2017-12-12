package com.sample.config;


import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
	@Autowired
	private DataSource dataSource;
	
	private static String ROLE_USER = "USER";
	private static String ROLE_ADMIN = "ADMIN";

	@Autowired
	public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
		auth.jdbcAuthentication().dataSource(dataSource)
		.authoritiesByUsernameQuery("select id as username, role from user " + 
		" where id = ?")
		.usersByUsernameQuery(
			"select id as username, password, true as enabled from user " + 
			" where id = ?");
	}

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http.authorizeRequests().antMatchers("/", "/login", "/error")
		.permitAll() // 認証なしでもOK
		.antMatchers("/master").hasRole(ROLE_ADMIN) // adminユーザのみ(DB値のROLE_を除いた部分と一致)
		.anyRequest().authenticated(); // それ以外は認証があればOK
		
		http.csrf().disable().formLogin()
		.loginProcessingUrl("/login") // 認証処理のパス
		.loginPage("/login") // ログインフォームのパス
		.failureUrl("/login?error") // 認証失敗時のパス
		.defaultSuccessUrl("/main", false) // 認証成功時の遷移先, 必ずこの画面に遷移するか否か
		.usernameParameter("userid").passwordParameter("password"); // ログインフォームのユーザ名、パスワード名(name属性)
	
		http.logout().logoutRequestMatcher(new AntPathRequestMatcher("/logout")) // ログアウト処理のパス
		.logoutSuccessUrl("/login")
		.deleteCookies("JSESSIONID")
		.invalidateHttpSession(true); // ログアウト後の遷移先
	}
	
	@Override
	public void configure(WebSecurity web) throws Exception {
	    // セキュリティ設定を無視するリクエスト設定
	    // 静的リソース(images、css、javascript)に対するアクセスはセキュリティ設定を無視する
	    web.ignoring().antMatchers(
	                        "/images/**",
	                        "/css/**",
	                        "/js/**");
	}
}



