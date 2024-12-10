
package com.leilao.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.leilao.backend.model.Auction;
import com.leilao.backend.service.AuctionService;

@RestController
@RequestMapping("/api/auction")
@CrossOrigin
public class AuctionController {

    @Autowired
    private AuctionService auctionService;

    @PostMapping
    public Auction create(@RequestBody Auction auction) {
        return auctionService.create(auction);
    }

    @PutMapping
    public Auction update(@RequestBody Auction auction) {
        return auctionService.update(auction);
    }

    @GetMapping
    public List<Auction> listAll() {
        return auctionService.listAll();
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable("id") Long id) {
        auctionService.delete(id);
    }
}