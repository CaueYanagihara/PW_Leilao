package com.leilao.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.leilao.backend.model.Auction;

@Repository
public interface AuctionRepository extends JpaRepository<Auction, Long> {
}