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

@Autowired
public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
	auth.jdbcAuthentication().dataSource(dataSource)
	.authoritiesByUsernameQuery("select id as username, auth from user " + 
	" where id = ?")
	.usersByUsernameQuery(
		"select id as username, password, true as enabled from user " + 
		" where id = ?");
	}

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http.authorizeRequests().antMatchers("/login", "/error")
		.permitAll().anyRequest().authenticated();
		
		http.csrf().disable().formLogin()
		.loginProcessingUrl("/login")
		.loginPage("/login")
		.failureUrl("/login?status=error")
		.defaultSuccessUrl("/main", true)
		.usernameParameter("userid").passwordParameter("password");
	
		http.logout().logoutRequestMatcher(new AntPathRequestMatcher("/logout"))
		.logoutSuccessUrl("/login");
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



