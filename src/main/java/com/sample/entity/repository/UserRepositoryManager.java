package com.sample.entity.repository;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.transaction.Transactional;

import org.springframework.stereotype.Repository;

import com.sample.entity.UserEntity;

@Repository
public class UserRepositoryManager {
	
	@PersistenceContext(name = "PersistenceUnit")
	private EntityManager em;

	@Transactional
	public void persist(UserEntity sEntity) {

		em.persist(sEntity);

	}
	
	/**
	 * ユーザテーブル全件取得
	 * 
	 * @return
	 */
	public List<UserEntity> getAllMain() {

		String sqlString = "select * from main order by id asc";
		Query q = em.createNativeQuery(sqlString, UserEntity.class);

		@SuppressWarnings("unchecked")
		List<UserEntity> samples = (List<UserEntity>) q.getResultList();

		return samples;
	}
	
	@Transactional
	public String insertUser(String id, String pass, String name) {
		
		UserEntity user = new UserEntity();
		user.setId(id);
		user.setPassword(pass);
		user.setName(name);
		em.persist(user);
		
		return "{\"result\": \"ok\"}";
	}
	
	@Transactional
	public String updateUser(String id, String pass, String name) {
		
		UserEntity user = em.find(UserEntity.class, id);
		user.setPassword(pass);
		user.setName(name);
		em.merge(user);
		
		return "{\"result\": \"ok\"}";
	}
	
	@Transactional
	public String deleteUser(String id) {
		
		UserEntity user = em.find(UserEntity.class, id);
		em.remove(user);
		
		return "{\"result\": \"ok\"}";
	}



}
