package com.sample.entity.repository;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.transaction.Transactional;

import org.springframework.stereotype.Repository;

import com.sample.entity.MainEntity;

@Repository
public class MainRepositoryManager {
	
	@PersistenceContext(name = "PersistenceUnit")
	private EntityManager em;

	@Transactional
	public void persist(MainEntity sEntity) {

		em.persist(sEntity);

	}
	
	/**
	 * ユーザテーブル全件取得
	 * 
	 * @return
	 */
	public List<MainEntity> getAllMain() {

		String sqlString = "select * from main order by id asc";
		Query q = em.createNativeQuery(sqlString, MainEntity.class);

		@SuppressWarnings("unchecked")
		List<MainEntity> samples = (List<MainEntity>) q.getResultList();

		return samples;
	}
	

	@Transactional
	public String updateMain(MainEntity newmain) {
		
		MainEntity main = em.find(MainEntity.class, newmain.getId());
		main.setTime(newmain.getTime());
		main.setSell(newmain.getSell());
		main.setRule1(newmain.getRule1());
		main.setRule2(newmain.getRule2());
		main.setRule3(newmain.getRule3());
		main.setFilter1(newmain.getFilter1());
		main.setFilter2(newmain.getFilter2());
		main.setFilter3(newmain.getFilter3());
		main.setFilter4(newmain.getFilter4());
		main.setFilter5(newmain.getFilter5());
		main.setFilter6(newmain.getFilter6());
		em.merge(main);
		
		return "{\"result\": \"ok\"}";
	}
	
	@Transactional
	public String deleteMain(String id) {
		
		MainEntity main = em.find(MainEntity.class, id);
		em.remove(main);
		
		return "{\"result\": \"ok\"}";
	}



}
